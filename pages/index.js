import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";

function Home({ works, contact }) {
  return (
    <div>
      <Nav works={works} contact={contact} />
      <div class="vimeo-wrapper">
        <iframe
          src="https://player.vimeo.com/video/568021273?background=1"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const [works, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/contact"),
  ]);

  return {
    props: { works, contact },
    //revalidate: 1,
  };
}

export default Home;
