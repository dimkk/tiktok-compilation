const fs = require('fs');
const download = require('download');

async function Download (posts) {
    await Promise.all(posts.map(async (post) => {
        fs.writeFileSync(`${process.cwd()}/video/tmp/${post.id}.mp4`, await download(post.videoUrl));
    }));
}

module.exports = Download;
