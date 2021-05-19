const dedent = require("dedent");

const day = new Date().getDate();
const month = new Date().toLocaleString("default", { month: "long" }); // gets full month name capitalized
const year = new Date().getFullYear();

const videoInfo = {
    "asianGirls": {
        "title": `Asian Girls of Tik Tok - ${month} ${day+1}, ${year}`, // 👩🏻
        "description": dedent`
            A compilation of Tiktoks from Asian Girls.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok
            `,
        "tags": ['tik tok girl dance', 'tik tok abgs', 'tik tok asian beautiful girl', 'tiktok william'],
        "privacyStatus": "public",
    },
    "asianGuys": {
        "title": `Asian Guys of Tik Tok - ${month} ${day+1}, ${year}`, // 🤵🏻
        "description": dedent`
            A compilation of Tiktok videos from Asian Guys.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok #tiktokwilliam #asianguys`,
        "tags": ['asian guys tik tok', 'tik tok asian guys', 'tik tok asian boy', 'tik tok cute guys', 'cute asian guys tik tok', 'tiktok william'],
        "privacyStatus": "public",
    },
    "japan": {
        "title": `Tiktok Japan | 日本のティックトック - ${month} ${day+1}, ${year}`, // 🇯🇵
        "description": dedent`
            A compilation of Tiktoks from Japanese Tiktokers.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok日本 #ティックトック #tiktokjapan #tiktokwilliam`,
        "tags": ['tiktok japan', 'ティックトック', 'TikTok 日本', 'tiktok william'],
        "privacyStatus": "public",
    },
    "china": {
        "title": `Tiktok China (Douyin) - ${month} ${day+1}, ${year}`, // 🐉
        "description": dedent`
            A mashup of funny tiktoks from Douyin(抖音) / Tiktok China.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #抖音 #douyin #tiktokwilliam`,
        "tags": ['抖音', 'douyin', 'tiktok china', 'tiktok william', 'william tiktok'],
        "privacyStatus": "public",
    },
    "korea": {
        "title": `TikTok Korea - ${month} ${day+1}, ${year}`, // 🇰🇷
        "description": dedent`
            A compilation of tiktoks from Korean Tiktokers.
            Thanks for watching!

            Subscribe below & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktokkorea`,
        "tags": ['tik tok korea', 'tik tok korean', 'tik tok korean compilation', 'tik tok korean girls', 'tik tok korean boys', 'tiktok william'],
        "privacyStatus": "public",
    },
    "memes": {
        "title": ` Tiktok Memes - ${month} ${day+1}, ${year}`,
        "description": dedent`
            A compilation of the funniest Tiktok memes.
            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktokmemes`,
        "tags": ['tiktok', 'tik tok', 'tiktokmemes', 'funny tiktok', 'tik tok memes', 'funny tik tok videos', 'wifi plug tiktok', 'Succculent', 'fakememe', 'cringe', 'ironic tik tok trolls', 'visicks', 'galaxy tiktok', 'papa cringe', 'tiktok queen', 'monstro', 'verified tiktok channel'],
        "privacyStatus": "public",
    },
    "influencers": {
        "title":`Tik Tok Celebs, Influencers & Memes - ${month} ${day+1}, ${year}`, // 😀
        "description": dedent`
            A mashup of the latest tiktoks from:
            1) Charli D'Amelio
            2) Ondreaz Lopez
            3) Tony Lopez
            4) The Hype House
            5) Josh Richards and much more!

            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok #tiktokwilliam`,
        "tags": ['funny tik tok videos', 'tik tok', 'tiktok memes','tik tok memes','tik toks','tiktok','Tik Tok Compilation','memes','tiktok cringe','funny tik tok memes','tik tok 2020','ironic tik toks','cringey tik toks','meme compilation','funny','fakememe','funny tik tok compilation','tiktoks','tik tok musically','wifi plug tiktok','ironic tik tok','musically','ironic tik tok trolls','Succculent','wifi plug','memes compilation','musical.ly'],
        "privacyStatus": "public",
    },
    "trending": {
        "title": `TikToks So Funny I Forgot To Laugh`,
        "description": dedent`
            A mashup of the most recent trending tiktoks.
            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok #tiktokmashups #tiktokwilliam`,
        "tags": ['tiktok', 'tik tok', 'tiktok mashup', 'tik tok mashup', 'tiktok mashups', 'tik tok mashups', 'tik tok challenge', 'tiktok william'],
        "privacyStatus": "public",
    },
    "music": {
        "title": `👇 Marshmellow Down Tiktok`,
        "description": dedent`
            A compilation of photo collages by Tiktokers to the song Down by Marshmello.

            Song Link (1 hour): https://www.youtube.com/watch?v=85yPfwMzt38

            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1

            -----
            #tiktok #marshmello #down`,
        "tags": [`marshmello down tik tok`, `marshmello down tiktok`, 'tik tok marshmello down', 'tik tok korea', 'tiktok japan', 'tik tok marshmello song', 'tik tok korea marshmello'],
        "privacyStatus": "public",
    },
    "user": {
        "title": `😉 Tiktok Brooke Monk`,
        "description": dedent`
            A compilation of Tiktoks by Brooke Monk @brookemonk_ on tiktok.

            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉 https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1
            -----
            #tiktok #brookemonk #tiktokwilliam`,
        "tags": ['tiktok', 'tik tok', 'tiktok william', 'tiktok brooke monk', 'tiktok brooke monk', 'brooke monk tiktok', 'brooke monk tik tok'],
        "privacyStatus": "public",
    },
    "custom": {
        "title": `😉 Tiktok Brooke Monk`,
        "description": dedent`
            This video is a compilation of Tiktoks by Brooke Monk @brookemonk_
            Thanks for watching!

            Subscribe & I'll see you again tomorrow Kings & Queens!
            👉 https://youtube.com/channel/UCbJhs7xvYA4Js7oobhyP42Q?sub_confirmation=1
            -----
            #tiktok #brookemonk #tiktokwilliam`,
        "tags": ['tiktok', 'tik tok', 'tiktok william', 'tiktok brooke monk', 'tiktok brooke monk', 'brooke monk tiktok', 'brooke monk tik tok'],
        "privacyStatus": "public",
    },
    "test": {
        "title": `Test Video Upload`,
        "description": dedent`
            This video is a test video upload`,
        "tags": ['test'],
        "privacyStatus": "private",
    },
    "comment": dedent`
    Did you enjoy today's video? 👏
    👉 Subscribe and I'll see you again tomorrow kings and queens! 💖😉`,
    "emojis": "🤵‍♂️🎥🕺💃🔥💖👁️👄👁️😉😳🥺😗🤪🤫💥👏😎👲👩🎎🏋️👉🐕",
}

module.exports = videoInfo;