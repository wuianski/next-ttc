import "../styles/globals.css";
import "swiper/swiper-bundle.css";
import "lightgallery/css/lightgallery.css";
//import "react-awesome-slider/src/core/styles.scss";
import "react-awesome-slider/dist/styles.css";

export default function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}
