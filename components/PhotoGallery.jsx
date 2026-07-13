"use client";

import { useState, useRef } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ZoomOutRoundedIcon from "@mui/icons-material/ZoomOutRounded";
import NextJsImage from "@/components/NextJsImage";
import LightBoxNextJsImage from "@/components/LightBoxNextJsImage";
import useWindowWidth from "@/components/useWindowWidth";

const MOBILE_BREAKPOINT = 900;

const PHOTO_ALBUM_SIZES = {
  size: "calc(100vw - 40px)",
  sizes: [
    { viewport: "(max-width: 299px)", size: "calc(100vw - 10px)" },
    { viewport: "(max-width: 599px)", size: "calc(100vw - 20px)" },
    { viewport: "(max-width: 1199px)", size: "calc(100vw - 30px)" },
  ],
};

export default function PhotoGallery({ slides, enableCaptions = false }) {
  const [index, setIndex] = useState(-1);
  const lightboxRef = useRef(null);
  const width = useWindowWidth();
  const isMobile = width < MOBILE_BREAKPOINT;
  const plugins = enableCaptions ? [Zoom, Captions] : [Zoom];
  const iconProps = { sx: { fontSize: isMobile ? 30 : 50 } };

  return (
    <div>
      <PhotoAlbum
        photos={slides}
        layout="rows"
        targetRowHeight={150}
        renderPhoto={NextJsImage}
        defaultContainerWidth={600}
        sizes={PHOTO_ALBUM_SIZES}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={plugins}
        render={{
          slide: LightBoxNextJsImage,
          iconPrev: () => <ArrowBackIosRoundedIcon {...iconProps} />,
          iconNext: () => <ArrowForwardIosRoundedIcon {...iconProps} />,
          iconClose: () => <CloseRoundedIcon {...iconProps} />,
          iconZoomIn: () => <ZoomInRoundedIcon {...iconProps} />,
          iconZoomOut: () => <ZoomOutRoundedIcon {...iconProps} />,
        }}
        styles={{
          container: {
            backgroundColor: isMobile
              ? "rgba(0, 0, 0, 1)"
              : "rgba(0, 0, 0, 0.5)",
          },
        }}
        carousel={{ finite: true, padding: isMobile ? 20 : 80 }}
        captions={
          enableCaptions
            ? { descriptionTextAlign: "center", descriptionMaxLines: 5 }
            : { descriptionTextAlign: "center" }
        }
        animation={{
          fade: 300,
          navigation: 300,
          easing: {
            fade: "ease-in-out",
            navigation: "ease-in-out",
          },
        }}
        controller={{
          ref: lightboxRef,
          closeOnBackdropClick: true,
          closeOnPullDown: true,
        }}
        on={{ click: () => lightboxRef.current?.close() }}
        toolbar={{ buttons: isMobile ? ["close"] : [""] }}
        noScroll={{ disabled: true }}
      />
    </div>
  );
}
