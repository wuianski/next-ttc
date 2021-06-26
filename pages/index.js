import React from "react";
import Nav from "../components/nav";
import { fetchAPI } from "../lib/api";

function Home({ works, contact }) {
  return (
    <div>
      <Nav works={(works)} contact={(contact)}/>

      <video autoPlay muted loop className="myVideo">
        <source src={"/video/VidBg.mp4"} type="video/mp4" />
      </video>
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
