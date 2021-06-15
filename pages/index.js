import dynamic from "next/dynamic";
import { Box } from "grommet";
// video module
import ReactPlayer from "react-player";

const Nav = dynamic(() => import("../components/nav"));

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

export async function getStaticProps() {
  const baseUrl = process.env.STRAPI_API_URL;
  let worksURL = `${baseUrl}/works`;

  const res = await fetch(`${worksURL}`);
  const works = await res.json();
  return {
    props: {
      works,
    },
  };
}

export default Home;
