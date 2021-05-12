const fs = require('fs');
const download = require('download');

async function Download (posts) {

    try {
        let json = await fs.readFileSync(`${process.cwd()}/video/tmp/posts.json`,'utf8');
        const post = await JSON.parse(json);
        if (!post.headers) {
            throw new Error('There are no headers in post.json');
            return false;
        }
        const headers = post.headers;

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

    } catch (err) {
        console.error(`Download.js: `,err);
    }

}

module.exports = Download;
