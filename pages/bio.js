import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";
import { Box } from "grommet";

function Bio({ works, biography, contact }) {
  return (
    <div>
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
