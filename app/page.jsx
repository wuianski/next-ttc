import { fetchAPI } from "@/lib/api";
import Nav from "@/components/Nav";

async function getData() {
  const [works, contact, frontPageVideo] = await Promise.all([
    fetchAPI("/works"),
    fetchAPI("/contact"),
    fetchAPI("/front-page-video"),
  ]);
  return { works, contact, frontPageVideo };
}

export const metadata = {
  title: `首頁 Home | TTC Studios`,
  description: `TTC Studios' website`,
};

export default async function Page() {
  const { works, contact, frontPageVideo } = await getData();
  // console.log("frontPageVideo:", frontPageVideo);
  return (
    <div>
      <Nav works={works} contact={contact} />
      <div className="vimeo-wrapper">
        <iframe
          src={frontPageVideo.VideoUrl}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
