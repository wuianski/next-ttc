import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";
import Head from "next/head";

function Home({ works, contact, frontPageVideo }) {
  return (
    <div>
      <Head>
        <title>TingTongChang</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Nav works={works} contact={contact} />
      <div className="vimeo-wrapper">
        <iframe
          src={frontPageVideo.VideoUrl}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const [works, contact, frontPageVideo] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/contact"),
    fetchAPI("/front-page-video"),
  ]);

  return {
    props: { works, contact, frontPageVideo },
    //revalidate: 1,
  };
}

export default Home;
