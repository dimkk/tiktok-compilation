const TikTokScraper = require('tiktok-scraper');
const download = require('image-downloader');
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
                filetype: 'all'
            });
            console.log(posts);

            // Downloads first 3 video thumbnails
            for (let i=0; i<Math.min(num,3); i++) {
                download.image({
                    url: posts.collector[i].imageUrl,
                    dest: `${process.cwd()}/img/tmp/${i}.jpg`
                });
            }

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

            // Downloads first 3 video thumbnails
            for (let i=0; i<Math.min(num,3); i++) {
                download.image({
                    url: posts.collector[i].imageUrl,
                    dest: `${process.cwd()}/img/tmp/${i}.jpg`
                });
            }

            // Unzip the videos
            await extract(posts.zip, { dir: `${process.cwd()}/video/tmp` });
            console.log('Extraction complete');

            return posts;


        } catch (error) {
            console.log(error);
        }
    }

        // Hashtag
        this.music = async (num=1,musicId) => {
            try {
                const posts = await TikTokScraper.music(musicId, {
                    number: num,
                    download: true,
                    filepath: `${process.cwd()}/video/tmp`,
                    filetype: 'all'
                });
                console.log(posts);

                // Downloads first 3 video thumbnails
                for (let i=0; i<Math.min(num,3); i++) {
                    download.image({
                        url: posts.collector[i].imageUrl,
                        dest: `${process.cwd()}/img/tmp/${i}.jpg`
                    });
                }

                // Unzip the videos
                await extract(posts.zip, { dir: `${process.cwd()}/video/tmp` });
                console.log('Extraction complete');

                return posts;

            } catch (error) {
                console.log(error);
            }
        }

}

module.exports = GetVideo;