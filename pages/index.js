import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";

function Home({ works }) {
  return (
    <div>
      <Nav works={works} />

      <video autoPlay muted loop className="myVideo">
        <source src={"/video/VidBg.mp4"} type="video/mp4" />
      </video>
    </div>
  );
}

export async function getServerSideProps() {
  // Run API calls in parallel
  const [works] = await Promise.all([fetchAPI("/works")]);

  return {
    props: { works },
    //revalidate: 1,
  };
}

export default Home;
