const TikTokScraper = require('tiktok-scraper');
const fs = require('fs');
const extract = require('extract-zip');

function GetVideo (num) {

    // Trending
    this.trending = async (num=1) => {
        try {
            // Download tiktok videos
            const posts = await TikTokScraper.trend('', {
                number: num,
                download: true,
                filepath: `${process.cwd()}/video/tmp`,
                filetype: 'all',
                store: true,
                historypath: `video/`
            });
            console.log(posts);

            // Unzip the videos
            await extract(posts.zip, { dir: `${process.cwd()}/video/tmp` });
            console.log('Extraction complete');

            return posts;

        } catch (error) {
            console.log(`There was an error ${error}`);
        }
    }


    // Hashtag
    this.hashtag = async (num=1,hashtag) => {
        try {
            const posts = await TikTokScraper.hashtag(hashtag, {
                number: num,
                download: true,
                filepath: `${process.cwd()}/video/tmp`,
                filetype: 'all'
            });
            console.log(posts);

            // Unzip the videos
            await extract(posts.zip, { dir: `${process.cwd()}/video/tmp` });
            console.log('Extraction complete');

            return posts;


        } catch (error) {
            console.log(error);
        }
    }

        // Music
        this.music = async (num=1,musicId) => {
            try {
                const posts = await TikTokScraper.music(musicId, {
                    number: num,
                    download: true,
                    filepath: `${process.cwd()}/video/tmp`,
                    filetype: 'all'
                });
                console.log(posts);

                // Unzip the videos
                await extract(posts.zip, { dir: `${process.cwd()}/video/tmp` });
                console.log('Extraction complete');

                return posts;

            } catch (error) {
                console.log(error);
            }
        }


        // Users
        this.user = async (num=1,userId) => {
            try {

                const posts = await TikTokScraper.user(userId, {
                    number: num,
                    download: true,
                    filepath: `${process.cwd()}/video/tmp`,
                    filetype: 'all'
                });
                console.log(posts);

                // Unzip the videos
                await extract(posts.zip, { dir: `${process.cwd()}/video/tmp` });
                console.log('Extraction complete');

                return posts;

            } catch (error) {
                console.log(error);
            }
        }


        // Multi-users
        this.multiUser = async (num=1, userArr) => {
            try {
                const collectorArr = [];
                for (let i=0; i<userArr.length; i++) {
                    posts = await TikTokScraper.user(userArr[i], {
                        number: num,
                        download: true,
                        filepath: `${process.cwd()}/video/tmp`,
                        filetype: 'all'
                    })
                    .catch(e => {
                        continue;
                        console.log(`GetVideo.js Error: ${error}`);
                    });

                    collectorArr.push.apply(collectorArr, posts.collector);

                    // Unzip the videos
                    await extract(posts.zip, { dir: `${process.cwd()}/video/tmp` });
                    console.log('Extraction complete');
                }
                let postsArr = {'collector': collectorArr};
                return postsArr;

            } catch (error) {
                continue;
                console.log(`GetVideo.js Error: ${error}`);
            }
        }


}

module.exports = GetVideo;