import { fetchAPI } from "@/lib/api";
import Nav from "@/components/Nav";
import { Box } from "@mui/material";

async function getData() {
  const [works, biography, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/biography"),
    fetchAPI("/contact"),
  ]);
  return { works, biography, contact };
}

export async function generateMetadata() {
  const biography = await getData();

  if (!biography?.content) {
    return {
      title: "Bio | TTC Studio",
      description: "Biography details",
    };
  }

  return {
    title: `Bio | TTC Studio`,
    description: `${biography.content}`,
  };
}

export default async function Bio() {
  const { works, biography, contact } = await getData();
  // console.log("frontPageVideo:", frontPageVideo);
  return (
    <div>
      <Nav works={works} contact={contact} />
      <Box sx={{ backgroundColor: "white", marginTop: "0px" }}>
        <Box
          sx={{
            margin: "24px",
            paddingTop: "160px",
            fontSize: { xs: "18px", md: "36px" },
            lineHeight: { xs: "27px", md: "49px" },
          }}
        >
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
