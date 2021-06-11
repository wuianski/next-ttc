import Layout from "../components/Layout";

import "../styles/globals.css";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "lightgallery/css/lightgallery.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
