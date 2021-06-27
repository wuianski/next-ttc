import "../styles/globals.css";
import "swiper/swiper-bundle.css";
import "lightgallery/css/lightgallery.css";
import "react-awesome-slider/dist/styles.css";

import mailgo from "mailgo";
import { useEffect } from "react";
const mailgoConfig = { dark: true, showFooter: false };

export default function App({ Component, pageProps }) {
  useEffect(() => {
    mailgo(mailgoConfig);
  }, []);

  return (
      <Component {...pageProps} />
  );
}
