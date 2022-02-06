import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";
import Head from "next/head";

function Home({ works, contact, frontPageVideo }) {
  return (
    <div>
      <Head>
        <title>張碩尹 Ting Tong Chang</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="張碩尹為台灣藝術家，創作跨及裝置、表演、錄像與繪畫，並結合不同知識領域，反應人與科技、社會的關係。Ting Tong Chang is a Taiwanese artist known for his collaborative projects through a variety of media including installation, performance, video and painting."
        />
        <meta
          name="google-site-verification"
          content="VGE8JRrLX72D-52tK97AVHHplepzqTgFSP2QvTqdvu4"
        />
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
