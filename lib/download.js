const fs = require('fs');
const https = require('https');
const { URL } = require('url');
const path = require('path');

import { getStrapiURL } from './api';

/**
 * @typedef {Object} MediaInfo
 * @property {string} name
 * @property {string} hash
 * @property {string} ext
 * @property {string} mime
 * @property {number} width
 * @property {number} height
 * @property {number} size
 * @property {string} url
 */

const PublicMediaFolderName = 'res'

const fileHash = {};

const isNeedRefresh = (filename, hash) => {
    if (!fileHash[filename]) {
        return true;
    }

    return fileHash[filename] !== hash;
};

const updateFileHash = (filename, hash) => {
    fileHash[filename] = hash;
};

const getFilename = (urlPath) => {
    const url = new URL(urlPath);
    return path.basename(url.pathname);
};

/**
 * 
 * @param {MediaInfo} mediaInfo 
 * @returns {[string,string,string]} [filename, local-disk-file-path, file-url]
 */
export const getLocalMediaPath = (mediaInfo) => {
    const filename = getFilename(getStrapiURL(mediaInfo.url));
    return [
        filename,
        path.join(`./public/${PublicMediaFolderName}`, filename),
        path.join(PublicMediaFolderName, filename)
    ];
};

const download = async (url, filePath) => {
    const proto = !url.charAt(4).localeCompare('s') ? https : http;

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        let fileInfo = null;

        const request = proto.get(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }

            fileInfo = {
                mime: response.headers['content-type'],
                size: parseInt(response.headers['content-length'], 10),
            };

            response.pipe(file);
        });

        // The destination stream is ended by the time it's called
        file.on('finish', () => resolve(fileInfo));

        request.on('error', err => {
            fs.unlink(filePath, () => reject(err));
        });

        file.on('error', err => {
            fs.unlink(filePath, () => reject(err));
        });

        request.end();
    });
}



/**
 * @param {MediaInfo} mediaInfo
 */
const getMediaFile = async (mediaInfo) => {
    try {
        const [filename, diskFilePath, urlPath] = getLocalMediaPath(mediaInfo);
        const doRefresh = isNeedRefresh(filename, mediaInfo.hash);
        if (!doRefresh) {
            return urlPath;
        }

        const resourceUrl = getStrapiURL(mediaInfo.url);
        await download(resourceUrl, diskFilePath);
        updateFileHash(filename, mediaInfo.hash);
        return urlPath;
    } catch (error) {
        console.error(error);
    }
};

export default getMediaFile;