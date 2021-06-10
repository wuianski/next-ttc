import React from "react";

function Worklist({ works }) {
  return (
    <div>
      {works.map((work) => (
        <div key={work.id}>{work.title}</div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const baseUrl = process.env.STRAPI_API_URL;
  //console.log(baseUrl);
  let worksURL = `${baseUrl}/works`;

  const res = await fetch(`${worksURL}`);
  const works = await res.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      works,
    },
  };
}

export default Worklist;
