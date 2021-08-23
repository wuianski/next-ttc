import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";
import { Box } from "grommet";
import Head from "next/head";

function Bio({ works, biography, contact }) {
  return (
    <div>
      <Head>
        <title>Bio - Ting Tong Chang 張碩尹</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Ting-Tong Chang (b. 1982) received his MFA at Goldsmiths, University of London, and has exhibited internationally. 張碩尹（b. 1982），國立政治大學廣告學學士，倫敦大學金匠學院藝術碩士畢．其創作媒材跨及裝置、繪畫、表演與錄像，並結合科學、生物學、生物動力學等不同知識領域，反應人與科技、社會的關係。"
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

export async function getServerSideProps() {
  // Run API calls in parallel
  const [works, biography, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/biography"),
    fetchAPI("/contact"),
  ]);

  return {
    props: { works, biography, contact },
    //revalidate: 1,
  };
}

export default Bio;
