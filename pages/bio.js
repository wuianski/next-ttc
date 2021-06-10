import { Box } from "grommet";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("../components/nav"));

function Bio({  biography  }) {
  return (
    <div>
      <Nav />
      <Box pad="medium" align="start" margin={{ left: "12px" }}>
        <div
          className="artist_textTW fr"
          dangerouslySetInnerHTML={{
            __html: biography.content,
          }}
        />
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

  const res = await fetch(`${biographyURL}`);
  const biography = await res.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      biography,
    },
  };
}

export default Bio;
