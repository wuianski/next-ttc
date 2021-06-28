import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";
import Head from "next/head";

function Home({ works, contact }) {
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
          src="https://player.vimeo.com/video/568021273?background=1"
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
  const [works, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/contact"),
  ]);

  return {
    props: { works, contact },
    //revalidate: 1,
  };
}

export default Home;
