import { fetchAPI } from "@/lib/api";

async function getData() {
    const works = await fetchAPI("/works");
    return works;
}

export default async function sitemap() {
    const work = await getData();
    // console.log(work);
    return [
        {
            url: 'https://tingtongchang.co.uk',
        },
        {
            url: 'https://tingtongchang.co.uk/bio',
        },
        {
            url: 'https://tingtongchang.co.uk/2d',
        },
        ...work.map(({ id }) => {
            return {
                url: `https://tingtongchang.co.uk/works/${id}`,
            };
        })
    ];
}