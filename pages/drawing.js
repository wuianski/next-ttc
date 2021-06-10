import React from "react";
import Image from "next/image";
import { Box } from "grommet";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/nav"));

// LightGallery module
const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
//import "lightgallery/css/lightgallery.css";

function Drawing({ drawings, baseUrl }) {
  /*const myLoader = ({ src, width, quality }) => {
    return `${baseUrl}${src}?w=${width}&q=${quality || 90}`;
  };*/

  return (
    <div>
      <Nav />
      <Box pad="medium" align="start" margin={{ left: "7px" }}>
        <div>
          <LightGallery plugins={[]}>
            {drawings.map((drawing) => (
              <a
                key={drawing.image.order}
                className="gallery-item"
                data-src={baseUrl + drawing.image.formats.large.url}
                data-sub-html={drawing.description}
              >
                <img
                  className="img-responsive"
                  src={baseUrl + drawing.image.formats.small.url}
                />
              </a>
            ))}
          </LightGallery>
        </div>
      </Box>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const baseUrl = process.env.STRAPI_API_URL;
  //console.log(baseUrl);
  let drawingURL = `${baseUrl}/drawings`;

  const res = await fetch(`${drawingURL}`);
  const drawings = await res.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      drawings,
      baseUrl,
    },
  };
}

export default Drawing;
