const fs = require('fs');
const download = require('download');

async function Download (posts) {

    let postData = await fs.readFileSync(`${process.cwd()}/video/tmp/posts.json`,'utf8');
    // console.log(`Download.js typeof: ${typeof postData}`);
    // console.log(`Download.js data: ${postData}`);
    headers = await JSON.parse(postData);
    headers = headers.headers;

    // console.log(`Download.js headers:`);
    // console.log(headers);
    // console.log('running download script');

    await Promise.all(posts.map(async (post) => {
        download(post.videoUrl,{'headers': headers}).pipe(fs.createWriteStream(`${process.cwd()}/video/tmp/${post.id}.mp4`));
        // fs.writeFileSync(
        //     `${process.cwd()}/video/tmp/${post.id}.mp4`,
        //     await download(
        //         post.videoUrl,
        //         {'headers': headers}
        //     )
        // );
    }));
}

module.exports = Download;
