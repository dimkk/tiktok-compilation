const TikTokScraper = require('tiktok-scraper');
const fs = require('fs');
const extract = require('extract-zip');

function GetVideo (num) {

    // Trending
    this.trending = async (num=1) => {
        try {
            const posts = await TikTokScraper.trend('', {
                number: num,
                download: false,
                filepath: `${process.cwd()}/video/tmp`,
                filetype: '',
                store: true,
                noWaterMark: false,
                historypath: `${process.cwd()}/video/`
            });
            // console.log(posts);
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
                download: false,
                noWaterMark: false,
                filepath: `${process.cwd()}/video/tmp`,
                filetype: ''
            });
            // console.log(posts);
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
                download: false,
                noWaterMark: false,
                filepath: `${process.cwd()}/video/tmp`,
                filetype: ''
            });
            // console.log(posts);
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
                download: false,
                noWaterMark: false,
                filepath: `${process.cwd()}/video/tmp`,
                filetype: ''
            });
            // console.log(posts);
            return posts;

        } catch (err) {
            console.log(err);
        }
    }


    // Multi-hashtags
    this.multiHashtag = async (num=1, hashtagArr) => {
        try {
            const collectorArr = [];
            await Promise.all(hashtagArr.map(async (hashtag) => {
                posts = await TikTokScraper.user(hashtag, {
                    number: num,
                    download: false,
                    noWaterMark: false,
                    filepath: `${process.cwd()}/video/tmp`,
                    filetype: ''
                });
                collectorArr.push.apply(collectorArr, posts.collector);
            }));

            let postsArr = {'collector': collectorArr};
            return postsArr;

        } catch (err) {
            console.log(`GetVideo.js > this.multiUser: ${err}`);
        }
    }

    // Multi-users
    this.multiUser = async (num=1, userArr) => {
        try {
            const collectorArr = [];
            await Promise.all(userArr.map(async (userName) => {
                posts = await TikTokScraper.user(userName, {
                    number: num,
                    download: false,
                    noWaterMark: false,
                    filepath: `${process.cwd()}/video/tmp`,
                    filetype: ''
                });
                collectorArr.push.apply(collectorArr, posts.collector);
            }));

            let postsArr = {'collector': collectorArr};
            return postsArr;

        } catch (err) {
            console.log(`GetVideo.js > this.multiUser: ${err}`);
        }

    }



}

module.exports = GetVideo;