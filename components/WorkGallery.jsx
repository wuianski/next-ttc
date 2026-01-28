"use client";

import React, { useState, useRef } from "react";
/* react-photo-album */
import PhotoAlbum from "react-photo-album";
import NextJsImage from "@/components/NextJsImage";
/* yet-another-react-lightbox */
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
/* MUI Icons */
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
/* Components */
import LightBoxNextJsImage from "./LightBoxNextJsImage";
import useWindowWidth from "@/components/useWindowWidth";

export default function WorkGallery({ photos, params }) {
  // console.log(photos);

  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
  const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
  const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
  const myphotos = photos.map((photo) => ({
    src: `${photo.url}`,
    width: photo.width,
    height: photo.height,

    /* with zoom plugin in Lightbox */
    srcSet: [...imageSizes, ...deviceSizes]
      .filter((size) => size <= photo.width)
      .map((size) => ({
        src: `${photo.url}`,
        width: size,
        height: Math.round((photo.height / photo.width) * size),
      })),
  }));

  const [index, setIndex] = useState(-1);
  const [renderPrev, setRenderPrev] = useState(true);
  const [renderNext, setRenderNext] = useState(true);
  const [finite, setFinite] = useState(true);

  // console.log("myphotos:", myphotos);
  const ref = useRef(null);

  /* Detect window width */
  const width = useWindowWidth();
  const isMobile = width < 900;

  return (
    <>
      <div>
        <PhotoAlbum
          photos={myphotos}
          layout="rows"
          targetRowHeight={150}
          // columns={1}
          renderPhoto={NextJsImage}
          defaultContainerWidth={600}
          sizes={{
            size: "calc(100vw - 40px)",
            sizes: [
              { viewport: "(max-width: 299px)", size: "calc(100vw - 10px)" },
              { viewport: "(max-width: 599px)", size: "calc(100vw - 20px)" },
              { viewport: "(max-width: 1199px)", size: "calc(100vw - 30px)" },
            ],
          }}
          onClick={({ index: current }) => setIndex(current)}
        />

        <Lightbox
          slides={myphotos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Zoom]}
          render={{
            slide: LightBoxNextJsImage,
            buttonPrev: renderPrev ? undefined : () => null,
            buttonNext: renderNext ? undefined : () => null,
            iconPrev: () => (
              <ArrowBackIosRoundedIcon sx={{ fontSize: isMobile ? 30 : 50 }} />
            ),
            iconNext: () => (
              <ArrowForwardIosRoundedIcon
                sx={{ fontSize: isMobile ? 30 : 50 }}
              />
            ),
            iconClose: () => (
              <CloseRoundedIcon sx={{ fontSize: isMobile ? 30 : 50 }} />
            ),
            iconZoomIn: () => (
              <ZoomInRoundedIcon sx={{ fontSize: isMobile ? 30 : 50 }} />
            ),
            iconZoomOut: () => (
              <ZoomOutRoundedIcon sx={{ fontSize: isMobile ? 30 : 50 }} />
            ),
          }}
          styles={{
            container: {
              backgroundColor: isMobile
                ? "rgba(0, 0, 0, 1)"
                : "rgba(0, 0, 0, 0.5)",
            },
          }}
          carousel={{ finite, padding: isMobile ? 20 : 80 }}
          captions={{ descriptionTextAlign: "center" }}
          animation={{
            fade: 300,
            navigation: 300,
            easing: {
              fade: "ease-in-out",
              navigation: "ease-in-out",
            },
          }}
          controller={{
            ref,
            closeOnBackdropClick: true,
            closeOnPullDown: true,
          }}
          on={{ click: () => ref.current?.close() }}
          toolbar={{ buttons: isMobile ? ["close"] : [""] }}
          noScroll={{ disabled: true }}
        />
      </div>
    </>
  );
}
