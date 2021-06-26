import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";
import { Box } from "grommet";
import Gallery from "../components/gallery";

function Drawing({ works, drawings, contact }) {
  /*const myLoader = ({ src, width, quality }) => {
    return `${baseUrl}${src}?w=${width}&q=${quality || 90}`;
  };*/

  return (
    <div>
      <Nav works={works} contact={contact} />
      <Box background="white" margin={{ top: "0px" }}>
        <Box pad="medium" align="start" margin={{ left: "7px", top: "160px" }}>
          <div>
            <Gallery drawings={drawings} />
          </div>
        </Box>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const [works, drawings, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/drawings"),
    fetchAPI("/contact"),
  ]);

  return {
    props: { works, drawings, contact },
    //revalidate: 1,
  };
}

export default Drawing;
