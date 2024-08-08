import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";
import { Box } from "grommet";
import Head from "next/head";

function Bio({ works, biography, contact }) {
  return (
    <div>
      <Head>
        <title>Bio - 張碩尹 Ting Tong Chang</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="張碩尹1982年出生於台灣台北，現工作與居住於台北與倫敦，其合作型計畫跨及裝置、錄像與劇場，反應人與科技、社會的關係。Ting Tong Chang (b.1982, Taipei, Taiwan) is an artist who lives and works in Taipei and London. Chang is known for his collaborative projects through a variety of media including installation, video and theatre."
        />
      </Head>

      <Nav works={works} contact={contact} />
      <Box background="white" margin={{ top: "0px" }}>
        <Box pad="medium" align="start" margin={{ left: "12px", top: "130px" }}>
          <div
            className="bioContent"
            dangerouslySetInnerHTML={{
              __html: biography.content,
            }}
          />
        </Box>
      </Box>
    </div>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [works, biography, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/biography"),
    fetchAPI("/contact"),
  ]);

  return {
    props: { works, biography, contact },
    revalidate: 10,
  };
}

export default Bio;
