import { fetchAPI } from "@/lib/api";
import Nav from "@/components/Nav";
import { Box } from "@mui/material";
import TwoDGallery from "@/components/TwoDGallery";

async function getData() {
  const [works, drawings, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/drawings"),
    fetchAPI("/contact"),
  ]);
  return { works, drawings, contact };
}

export async function generateMetadata() {
  return {
    title: `2D | TTC Studio`,
    description: `2D details`,
  };
}

export default async function Drawing() {
  const { works, drawings, contact } = await getData();
  /* revert drawings order to ascending */
  drawings.sort((a, b) => b.order - a.order);
  return (
    <div>
      <Nav works={works} contact={contact} />
      <Box sx={{ backgroundColor: "white", marginTop: "0px" }}>
        <Box sx={{ margin: "24px", paddingTop: "160px" }}>
          <TwoDGallery photos={drawings} />
        </Box>
      </Box>
    </div>
  );
}
