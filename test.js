const TikTokScraper = require('tiktok-scraper');
const fs = require('fs');

// const test = async () => {
//     const posts = await TikTokScraper.trend('', {
//         download: false,
//         filetype: `json`,
//     });
//     console.log(posts.length);
// }


// test();

const posts = fs.readFileSync('trend_1613366352144.json', 'utf8');
console.log(posts.length); // 94946