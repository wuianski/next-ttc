import React from "react";
import Nav from "../../components/nav";
import { fetchAPI } from "../../lib/api";
import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";
import { Box, Grid, ResponsiveContext, Grommet } from "grommet";
import Image from "next/image";
import ImageSwiper from "../../components/imageSwiper";

// swiper module, import css in _app.js
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use(Pagination);
// video module
import ReactPlayer from "react-player";

function Work({ worksList, work, baseUrl }) {
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
      <Nav works={worksList} />
      <div>
        <Swiper pagination={{ clickable: true }}>
          <div>
            {work.images.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="imgContainer" key={image.id}>
                  <ImageSwiper image={image} />
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      <div>
        <Box
          pad="medium"
          align="start"
          margin={{ left: "12px", right: "12px", top: "0px" }}
          background="white"
        >
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
                        className="vidDesR"
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
    </div>
  );
}

export async function getStaticPaths() {
  const works = await fetchAPI("/works");

  return {
    paths: works.map((work) => ({
      params: {
        id: work.id.toString(),
      },
    })),
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const works = await fetchAPI(`/works?id=${params.id}`);
  const worksList = await fetchAPI("/works");

  return {
    props: { work: works[0], worksList },
    revalidate: 1,
  };
}

export default Work;
