import React from "react";
import Image from "next/image";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";
import { Box, Grid, ResponsiveContext, Grommet } from "grommet";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../../components/nav"));

// swiper module, import css in _app.js
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use(Pagination);
// video module
import ReactPlayer from "react-player";

function Work({ works, work, baseUrl }) {
  // image loader
  const myLoader = ({ src, width, quality }) => {
    return `${baseUrl}${src}?w=${width}&q=${quality || 75}`;
  };
  // responsive grid
  const customBreakpoints = deepMerge(grommet, {
    global: {
      breakpoints: {
        small: {
          value: 1024,
        },
        medium: {
          value: 1280,
        },
        large: {
          value: 3000,
        },
      },
    },
  });

  const ResponsiveGrid = ({ children, areas, ...props }) => {
    const size = React.useContext(ResponsiveContext);

    return (
      <Grid areas={areas[size]} {...props}>
        {children}
      </Grid>
    );
  };

  return (
    <div>
      <Nav works={works} />
      <Box pad="medium" align="start" margin={{ left: "12px", right: "12px" }}>
        <div>
          <Grid
            columns={{ count: 1, size: "auto" }}
            gap="0px"
            pad={{ top: "10px", bottom: "60px" }}
          >
            <Box>
              <div>
                <Swiper pagination={{ clickable: true }}>
                  <div>
                    {work.images.map((image) => (
                      <SwiperSlide key={image.id}>
                        <div className="imgContainer" key={image.id}>
                          <Image
                            loader={myLoader}
                            src={image.formats.large.url}
                            alt={image.hash}
                            width={1920}
                            height={1080}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
            </Box>
          </Grid>
        </div>

        <div>
          <div className="workTitle">{work.title_en}</div>
          <div className="workTitle">{work.title}</div>
          <div className="workPlaceYear">
            <span>{work.subtitle_en}</span>
            <span>{work.subtitle},</span>
            <span>{work.year}</span>
          </div>
        </div>

        <div>
          <Grommet theme={customBreakpoints} full className="RG">
            <ResponsiveGrid
              columns={["47.8%", "47.8%"]}
              rows={["100%", "100%", "100%"]}
              pad={{ top: "30px", bottom: "30px", right: "12px" }}
              areas={{
                small: [
                  { name: "one", start: [0, 0], end: [1, 0] },
                  { name: "two", start: [0, 1], end: [1, 1] },
                  { name: "three", start: [0, 2], end: [1, 2] },
                ],
                medium: [
                  { name: "one", start: [0, 0], end: [0, 0] },
                  { name: "two", start: [1, 0], end: [1, 0] },
                  { name: "three", start: [1, 1], end: [1, 1] },
                ],

                large: [
                  { name: "one", start: [0, 0], end: [0, 0] },
                  { name: "two", start: [1, 0], end: [1, 0] },
                  { name: "three", start: [1, 1], end: [1, 1] },
                ],
              }}
            >
              <Box gridArea="one">
                <div
                  className="workDesL"
                  dangerouslySetInnerHTML={{
                    __html: work.description_en_us.desctiption,
                  }}
                />
                <div className="workDesL">
                  {work.description_en_us.urls.map((url) => (
                    <div>
                      {url.id && (
                        <div>
                          <Box pad={{ top: "50px" }}>
                            <div>review</div>
                          </Box>
                          <a href={url.link} target="_blank" rel="noreferrer">
                            <p className="reviewLink">{url.link}</p>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Box>

              <Box gridArea="two">
                <div
                  className="workDesR"
                  dangerouslySetInnerHTML={{
                    __html: work.description_zh_tw.desctiption,
                  }}
                />
                <div className="workDesR">
                  {work.description_zh_tw.urls.map((url) => (
                    <div>
                      {url.id && (
                        <div>
                          <Box pad={{ top: "50px" }}>
                            <div>評論</div>
                          </Box>
                          <a href={url.link} target="_blank" rel="noreferrer">
                            <p className="reviewLink">{url.link}</p>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Box>

              <Box gridArea="three">
                <div>
                  {work.video && (
                    <div className="player-wrapper">
                      <ReactPlayer
                        className="react-player"
                        url={work.video.link}
                        width="100%"
                        height="100%"
                        controls
                      />
                    </div>
                  )}
                </div>
                <Box pad={{ top: "30px" }}>
                  {work.video && (
                    <div
                      className="workDesR"
                      dangerouslySetInnerHTML={{
                        __html: work.video.description,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </ResponsiveGrid>
          </Grommet>
        </div>
      </Box>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const baseUrl = process.env.STRAPI_API_URL;
  //console.log(baseUrl);
  let worksURL = `${baseUrl}/works`;

  // Call an external API endpoint to get posts
  const res = await fetch(`${worksURL}`);
  const works = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = works.map((work) => ({
    params: { id: work.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const baseUrl = process.env.STRAPI_API_URL;
  let worksURL = `${baseUrl}/works`;

  const res = await fetch(`${worksURL}/${params.id}`);
  const work = await res.json();
  const res2 = await fetch(`${worksURL}`);
  const works = await res2.json();

  return {
    props: {
      works,
      work,
      baseUrl,
    },
  };
}

export default Work;
