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
                historypath: `${process.cwd()}/video/`
            });
            console.log(posts);
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
            return posts;

        } catch (error) {
            console.log(error);
        }
    }


    // Multi-hashtags
    this.multiHashtag = async (num=1, hashtagArr) => {
        const collectorArr = [];
        for (let i=0; i<hashtagArr.length; i++) {
            try {
                posts = await TikTokScraper.hashtag(hashtagArr[i], {
                    number: num,
                    download: true,
                    filepath: `${process.cwd()}/video/tmp`,
                    filetype: 'all'
                });

                collectorArr.push.apply(collectorArr, posts.collector);

            } catch (error) {
                console.log(`GetVideo.js Error: ${error}`);
                continue;
            }
        }
        let postsArr = {'collector': collectorArr};
        return postsArr;
    }

    // Multi-users
    this.multiUser = async (num=1, userArr) => {
        const collectorArr = [];
        for (let i=0; i<userArr.length; i++) {
            try {
                posts = await TikTokScraper.user(userArr[i], {
                    number: num,
                    download: true,
                    filepath: `${process.cwd()}/video/tmp`,
                    filetype: 'all'
                });

                collectorArr.push.apply(collectorArr, posts.collector);

            } catch (error) {
                console.log(`GetVideo.js Error: ${error}`);
                continue;
            }
        }
        let postsArr = {'collector': collectorArr};
        return postsArr;
    }

}

module.exports = GetVideo;