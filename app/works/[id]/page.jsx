import { fetchAPI } from "@/lib/api";
import Nav from "@/components/Nav";
import { Box } from "@mui/material";
import WorkContent from "@/components/WorkContent";

async function getWork(id) {
  const work = await fetchAPI(`/works?id=${id}`);
  return { work: work[0] };
}

async function getData() {
  const [works, contact] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/contact"),
  ]);
  return { works, contact };
}

export default async function Page({ params }) {
  const work = await getWork((await params).id);
  const { works, contact } = await getData();
  //   console.log(work);
  return (
    <>
      <Nav works={works} contact={contact} />
      <Box sx={{ backgroundColor: "white", marginTop: "0px" }}>
        <Box sx={{ margin: "24px", paddingTop: "12px" }}>
          <WorkContent work={work.work} />
        </Box>
      </Box>
    </>
  );
}
