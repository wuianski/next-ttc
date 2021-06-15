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

function Drawing({ works, drawings, baseUrl }) {
  /*const myLoader = ({ src, width, quality }) => {
    return `${baseUrl}${src}?w=${width}&q=${quality || 90}`;
  };*/

  return (
    <div>
      <Nav works={works} />
      <Box background="white" margin={{ top: "-100px" }}>
        <Box pad="medium" align="start" margin={{ left: "7px", top: "120px" }}>
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
                    key={drawing.image.order}
                    className="img-responsive"
                    src={baseUrl + drawing.image.formats.small.url}
                  />
                </a>
              ))}
            </LightGallery>
          </div>
        </Box>
      </Box>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.

export async function getStaticProps() {
  const baseUrl = process.env.STRAPI_API_URL;
  let drawingURL = `${baseUrl}/drawings`;
  let worksURL = `${baseUrl}/works`;

  const res = await fetch(`${drawingURL}`);
  const drawings = await res.json();
  const res2 = await fetch(`${worksURL}`);
  const works = await res2.json();

  return {
    props: {
      works,
      drawings,
      baseUrl,
    },
  };
}

export default Drawing;
