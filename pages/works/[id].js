import React from "react";
import Image from "next/image";
import { Box } from "grommet";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../../components/nav"));

//swiper module, import css in _app.js
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use(Pagination);

import ReactPlayer from "react-player";

function Work({ works, work, baseUrl }) {
  return (
    <div>
      <Nav works={works} />
      <Box pad="medium" align="start" margin={{ left: "12px" }}>
        {work.video && <ReactPlayer url={work.video.link} controls />}
        <div>{work.title_en}</div>
        <div>{work.title}</div>
        <div>
          <span>{work.subtitle_en}</span>
          <span>{work.subtitle}</span>
          <span>{work.year}</span>
        </div>
        <div>
          <div>{work.description_en_us.desctiption}</div>
          <div>{work.description_zh_tw.desctiption}</div>
        </div>
        <div>
          <Swiper pagination={{ clickable: true }}>
            <div>
              {work.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <div key={image.id}>
                    <img src={baseUrl + image.formats.large.url} />
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
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
