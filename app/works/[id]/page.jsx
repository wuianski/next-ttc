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

export async function generateMetadata({ params }) {
  const work = await getWork((await params).id);

  if (!work?.work?.title) {
    return {
      title: "work | TTC Studio",
      description: "Work details",
    };
  }

  return {
    title: `${work.work.title} | TTC Studio`,
    description: work.work.title,
    canonical: `https://tingtongchang.co.uk/works/${work.work.id}`,
    openGraph: {
      type: "website",
      url: `https://tingtongchang.co.uk/works/${work.work.id}`,
      title: work.work.title,
      description: work.work.title,
      images: [
        {
          url: `${work.work.images[0].url}`,
          width: work.work.images[0].formats.thumbnail.width,
          height: work.work.images[0].formats.thumbnail.height,
          alt: "Cover of the artwork",
        },
      ],
      site_name: "tingtongchang.co.uk",
    },
  };
}

export default async function Page({ params }) {
  const work = await getWork((await params).id);
  const { works, contact } = await getData();
  // console.log(work.work.images[0]);
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
