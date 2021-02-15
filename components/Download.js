const fs = require('fs');
const download = require('download');

async function Download (posts) {

    let headers = {};
    await fs.readFile(`${process.cwd()}/../video/tmp/posts.json`,'utf8', async (err, data) => {
        // console.log(`Download.js typeof: ${typeof data}`);
        // console.log(`Download.js headers1: ${data}`);
        headers = await JSON.parse(data);
        headers = headers['headers'];
        // console.log(`Download.js headers2: ${headers}`);

        if (err) {
            console.log(`Download.js ${err}`);
        };
    });

    await Promise.all(posts.map(async (post) => {
        fs.writeFileSync(
            `${process.cwd()}/video/tmp/${post.id}.mp4`,
            await download(
                post.videoUrl,
                {'headers': headers}
            )
        );
    }));
}

module.exports = Download;
