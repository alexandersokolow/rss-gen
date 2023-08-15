const rp = require("request-promise");
const cheerio = require("cheerio");

const getChannelHtml = async (channelName) => {
  const url = `https://rumble.com/c/${channelName}`;
  const alt_url = `https://rumble.com/user/${channelName}`;
  try {
    return await rp(url);
  } catch {
    return await rp(alt_url);
  }
};

const getRumblePosts = async (channelName) => {
  const html = await getChannelHtml(channelName);
  const $ = cheerio.load(html);
  const items = $(".video-listing-entry", html).toArray();
  const posts = items.map((item) => {
    const title = $(".video-item--title", item).text();
    const url_rel = $(".video-item--a", item).attr("href");
    const url_abs = `https://rumble.com${url_rel}`;
    const thumbnail = $(".video-item--img", item).attr("src");
    const date = $(".video-item--time", item).attr("datetime");
    const views = $(".video-item--views", item).attr("data-value") || "hidden";
    const duration = $(".video-item--duration", item).attr("data-value");
    const description = `Views: ${views}<br/>Duration: ${duration}`;
    return { title, link: url_abs, thumbnail, date, description };
  });
  return posts;
};

module.exports = { getRumblePosts };
