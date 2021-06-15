import { Box } from "grommet";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/nav"));

function Bio({ works, biography }) {
  return (
    <div>
      <Nav works={works} />
      <Box background="white" margin={{ top: "-100px" }}>
        <Box pad="medium" align="start" margin={{ left: "12px", top: "80px" }}>
          <div
            className="bioContent"
            dangerouslySetInnerHTML={{
              __html: biography.content,
            }}
          />
        </Box>
      </Box>
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const baseUrl = process.env.STRAPI_API_URL;
  //console.log(baseUrl);
  let biographyURL = `${baseUrl}/biography`;
  let worksURL = `${baseUrl}/works`;

  const res = await fetch(`${biographyURL}`);
  const biography = await res.json();
  const res2 = await fetch(`${worksURL}`);
  const works = await res2.json();

  return {
    props: {
      works,
      biography,
    },
  };
}

export default Bio;
