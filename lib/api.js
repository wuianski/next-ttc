export function getStrapiURL(path = "") {
  return `${process.env.STRAPI_API_URL}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}
