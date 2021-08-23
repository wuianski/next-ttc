import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";
import { Box } from "grommet";
import Gallery from "../components/gallery";
import Head from "next/head";
import getMediaFile from '../lib/download';
import { getStrapiURL } from '../lib/api';

function Drawing({ works, drawings, contact }) {
  /*const myLoader = ({ src, width, quality }) => {
    return `${baseUrl}${src}?w=${width}&q=${quality || 90}`;
  };*/

  return (
    <div>
      <Head>
        <title>Drawing - Ting Tong Chang 張碩尹</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="the collection of drawing practice" />
      </Head>

      <Nav works={works} contact={contact} />
      <Box background="white" margin={{ top: "0px" }}>
        <Box pad="medium" align="start" margin={{ left: "7px", top: "160px" }}>
          <div>
            <Gallery drawings={drawings} />
          </div>
        </Box>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const [works, drawings, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/drawings"),
    fetchAPI("/contact"),
  ]);

  // download all drawings first and change the drawings url to local url
  for (let index = 0; index < drawings.length; index++) {
    const draw = drawings[index];
    try {
      const newUrl = await getMediaFile(draw.image.formats.large);
      draw.image.formats.large.url = newUrl;
    } catch (error) {
      console.error(error)
    }
  }

  const mappedDrawings = drawings.map(draw => {
    return {
      order: draw.order,
      description: draw.description,
      url: draw.image.formats.large.url,
      alt: draw.image.formats.large.alternativeText || draw.image.formats.large.name,
    }
  });

  return {
    props: { works, drawings: mappedDrawings, contact },
    //revalidate: 1,
  };
}

export default Drawing;
