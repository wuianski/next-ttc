import dynamic from "next/dynamic";
import { Box } from "grommet";

const Nav = dynamic(() => import("../components/nav"));

function Home({ works }) {

  return (
    <div>
      <Nav works={works} />
      <Box pad="medium" align="start" margin={{ left: "12px" }}>
        <p>HOME PAGE is here!</p>
      </Box>
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
