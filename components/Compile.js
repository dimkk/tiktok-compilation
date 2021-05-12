const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const fsPromises = fs.promises;
const { getVideoDurationInSeconds } = require('get-video-duration');
const Download = require('./Download');

function Compile () {
  const colors = {
    'pink': ['Pink','MistyRose'],
    'blue': ['#6bc6ff','#bfe7ff'],
    'black': ['Black','LightSlateGray'],
    'blue2': ['#c0e6ff','#e1f5ff'],
    'orange': ['#ffdac0','#ffefe1'],
    'purple': ['#e5c0ff','#f2e1ff'],
    'red': ['#ffc0c0','#ffe1e1'],
  };
  const videoDir = `${process.cwd()}/video`,
        videoTmpDir = `${process.cwd()}/video/tmp`;

    // Resample videos
    this.resample = async (videos, options) => {
        try {
            const { color } = options;
            let bgColor = colors[color][0];

            console.log('Resampling videos...');
            for (let i=0; i<videos.length; i++) {
                await new Promise((resolve, reject) => {
                    console.log(`Resampling video: ${i+1}/${videos.length} - id: ${videos[i]}`);
                    ffmpeg(`${videoTmpDir}/${videos[i]}`)
                    .outputOptions([
                    '-r 30',
                    '-filter:v scale=w=1080:h=-1,pad=1080:1920:0:(oh/2-ih/2):black',
                    '-acodec copy',
                    '-preset veryfast',
                    '-max_muxing_queue_size 1024'
                    ])
                    .save(`${videoTmpDir}/${i}.mp4`)
                    .on('end', () => resolve())
                    .on('error', err => {
                        ffmpeg(`${videoTmpDir}/${videos[i]}`)
                            .outputOptions([
                            '-r 30',
                            `-vf scale=-1:1920,pad=1080:1920:(ow/2-iw/2):0:${bgColor}`,
                            '-acodec copy',
                            '-preset veryfast',
                            '-max_muxing_queue_size 1024'
                            ])
                            .save(`${videoTmpDir}/${i}.mp4`)
                            .on('end', () => resolve());
                    });
                });
            }
            console.log('Finished all resampling');
            return;
        } catch (err) {
            console.log(err);
        }
    }

  // Compile and resize videos
  this.compile = async (videos, color, width, height) => {
    try {
      // List file names into .txt document
      return new Promise((resolve, reject) => {
        console.log('Compiling videos...');
        let bgColor = (width === 1920) ? colors[color][0] : 'black';

        let listFileName = `${videoTmpDir}/list.txt`,
            fileNames = '';

        videos.forEach((fileName, index) => fileNames += `file './${index}.mp4'\n`);
        fileNames = [...new Set(fileNames.split('\n'))].join('\n'); // remove duplicates

        fs.writeFile(listFileName, fileNames, (err) => {
          if (err) console.log(`WriteFile Error: ${err}`);

          // Make video 1280x720
          ffmpeg(listFileName)
            .inputOptions(['-safe 0', '-f concat'])
            .outputOptions([
              `-filter:v scale=-1:${height},pad=${width}:${height}:(ow/2-iw/2):0:${bgColor}`,
              '-max_muxing_queue_size 1024',
              '-preset veryfast',
              '-acodec copy'
            ])
            .save(((width===1920) ? `${videoTmpDir}/tmp1.mp4` : `${videoTmpDir}/tmp1.mp4`)) // redundant currently to watermark vertical videos too
            .on('progress', p => console.log(`Rendering unstyled video: ${p.percent}`))
            .on('end', () => resolve())
            .on('error', err => console.log(`Rending error: ${err}`));
            });

      }).catch(err => console.log(`Resizing Error: ${err}`));
    }
    catch (err) {
      console.log(`CompileError: ${err}`);
    }
  }

  // Add logo and watermark
  this.styleHorizontal = async (color) => {
    return new Promise(resolve => {
      let txtColor = colors[color][1];
      console.log('Styling video...');
      ffmpeg()
        .input(`${videoTmpDir}/tmp1.mp4`)
        .input(`${videoDir}/logo.png`)
        .outputOptions([
          `-filter_complex [0:v][1:v]overlay=(300-75):(1080/2-150):[v1];[v1][1:v]overlay=(607+600+300-75):(1080/2-150):[v2],[v2]drawtext=fontfile=./res/Lobster-Regular.ttf:text='william':fontcolor=${txtColor}:fontsize=72:x=1675:y=(1080-80)`,
          '-preset veryfast', // try -preset veryfast
          '-acodec copy'
        ])
        .save(`${videoDir}/output.mp4`)
        .on('progress', p => console.log(`Rendering final video: ${p.percent}`))
        .on('end', () => {
          console.log('Video compiled, watermarked and ready to be uploaded');
          resolve();
        });
    });
  }

  this.styleVertical = async () => {
    return new Promise(resolve => {
      console.log('Styling video...');
      ffmpeg()
        .input(`${videoTmpDir}/tmp1.mp4`)
        .outputOptions([
          `-filter_complex drawtext=fontfile=./res/Lobster-Regular.ttf:text='william':fontcolor=#F8F8FF@0.4:fontsize=64:x=40:y=(1920-64-20)`, //BottomLeft fontcolor=#F8F8FF@0.3:fontsize=64:x=40:y=(1920-64-20) TopRight fontcolor=#F8F8FF@0.2:fontsize=64:x=(1080-210-30):y=(50)
          '-preset veryfast',
          '-acodec copy'
        ])
        .save(`${videoDir}/output.mp4`)
        .on('progress', p => console.log(`Rendering final video: ${p.percent}`))
        .on('end', () => {
          console.log('Video compiled, styled and ready to be uploaded');
          resolve();
        });
    });
  }

  this.hStack = async (videos, color, width, height) => {
    try {
        return new Promise(async (resolve, reject) => {
            let bgColor = colors[color][0];
            let hStackNames = '';
            let numLoops = Math.floor(videos.length/3);

            // Create series of 3x videos side by side using audio from video 0
            console.log('Creating hStack videos...');

            for (let i=0; i<numLoops; i++) {
                await this.hStackCreate(videos, color, width, height,i,numLoops);
                hStackNames += `file './hStack${i}.mp4'\n`;
            }

            // Create listFile of hStack videos
            let hStackList = `${videoTmpDir}/hStackList.txt`;

            await fsPromises.writeFile(hStackList, hStackNames, (err) => {
            if (err) console.log(`WriteFile Error: ${err}`);
            });
                // Compile hStack videos
                ffmpeg(hStackList)
                .inputOptions(['-safe 0', '-f concat'])
                .outputOptions([
                    `-filter:v scale=-1:${height},pad=${width}:${height}:(ow/2-iw/2):0:${bgColor}`,
                    '-max_muxing_queue_size 1024',
                    '-preset veryfast',
                    '-acodec copy'
                ])
                .save(`${videoDir}/output.mp4`)
                .on('progress', p => console.log(`Rendering Compiled hStack video: ${p.percent}`))
                .on('end', () => {
                    console.log(`Finished compiling hStack videos`);
                    resolve();
                })
                .on('error', err => console.log(`hStack compilation video rending error: ${err}`));
        });
    }
    catch (err) {
        console.log(`hStack Error: ${err}`);
    }
  }

    this.hStackCreate = async (videos, color, width, height, i, numLoops) => {
        return new Promise(async (resolve, reject) => {
            let len0, len1, len2, audioArr = [], audioIndex;
            len0 = await getVideoDurationInSeconds(`${videoTmpDir}/${i*3}.mp4`);
            len1 = await getVideoDurationInSeconds(`${videoTmpDir}/${i*3+1}.mp4`);
            len2 = await getVideoDurationInSeconds(`${videoTmpDir}/${i*3+2}.mp4`);
            audioArr.push(len0,len1,len2);
            audioIndex = audioArr.indexOf(Math.max(len0, len1, len2));

            ffmpeg(`${videoTmpDir}/${i*3}.mp4`)
                .input(`${videoTmpDir}/${i*3+1}.mp4`)
                .input(`${videoTmpDir}/${i*3+2}.mp4`)
                .outputOptions([
                    `-filter_complex [0:v][1:v][2:v]hstack=inputs=3[v4],[v4]scale=${width}:${height}[v5],[v5]drawtext=fontfile=./res/Lobster-Regular.ttf:text='william':fontcolor=#F8F8FF@0.4:fontsize=64:x=40:y=(1080-64-20)[v6]`,
                    `-map [v6]`,
                    `-map ${audioIndex}:a`,
                    '-max_muxing_queue_size 1024',
                    '-preset veryfast',
                    '-ac 2'
                ])
                .save(`${videoTmpDir}/hStack${i}.mp4`)
                .on('end', () => {
                    console.log(`Finished creating hStack video: ${i+1}/${numLoops}`);
                    resolve();
                })
                .on('error', err => console.log(`hStack video creation error: ${err}`));
        });
    };

    this.filterVids = async (posts, options) => {
        return new Promise(async (response, reject) => {
            try {
                console.log('Filtering videos...');
                const { days=1, likes=0, exBlockedSongs=false, hStack, minLength, maxLength, exPartlyBlockedSongs=false, exUnmonetizableSongs=false } = options;
                const excludeSongs = await JSON.parse(fs.readFileSync(`${process.cwd()}/res/excludeSongs.json`));
                const {fullyBlockedSongs, partiallyBlockedSongs, UnMonetizeSongs} = excludeSongs;
                const latestDate = new Date(new Date().setDate(new Date().getDate() - days));
                let videoIds = [];

                console.log(`${posts.collector.length} videos to start`);
                posts.collector.sort((a,b) => parseFloat(b.diggCount) - parseFloat(a.diggCount)); // sort highest likes first
                posts.collector = posts.collector.filter(post => new Date(post.createTime * 1000) > latestDate); // remove videos not within last X days
                console.log(`${posts.collector.length} videos after date filter`);

                posts.collector = posts.collector.filter(post => post.diggCount > likes); // remove videos with less than X likes
                console.log(`${posts.collector.length} videos after likes filter`);

                if (exBlockedSongs) posts.collector = posts.collector.filter(post => !fullyBlockedSongs.find(song => song.id === post.musicMeta.musicId)); // remove blocked songs
                if (exPartlyBlockedSongs) posts.collector = posts.collector.filter(post => !partiallyBlockedSongs.find(song => song.id === post.musicMeta.musicId)); // remove partially blocked songs
                if (exUnmonetizableSongs) posts.collector = posts.collector.filter(post => !UnMonetizeSongs.find(song => song.id === post.musicMeta.musicId)); // remove unmonetizable songs
                console.log(`${posts.collector.length} videos after song filter`);

                if (maxLength) posts.collector = posts.collector.filter(post => post.videoMeta.duration <= maxLength); // filter out long videos
                console.log(`${posts.collector.length} videos after maxLength filter`);

                if (minLength > 1) posts.collector = posts.collector.filter(post => post.videoMeta.duration >= minLength); // filter out long videos
                console.log(`${posts.collector.length} videos after minLength filter`);

                // Filter out corrupted videos
                let videoSize;
                let videos = fs.readdirSync(videoTmpDir).filter(file => /.mp4$/.test(file));
                await Promise.all(videos.map(async (video) => {
                    videoSize = fs.statSync(`${videoTmpDir}/${video}`).size;
                    if (videoSize < 2000) {
                        posts.collector = posts.collector.filter(post => post.id !== video.slice(0,video.length-4));
                    }
                }));
                console.log(`${posts.collector.length} videos after videoSize filter`);

                posts.collector.forEach(e => videoIds.push(`${e.id}.mp4`));
                videoIds = [...new Set(videoIds)]; // remove duplicates
                console.log(`${videoIds.length} videos after removing duplicates`);

                // Make sure multiple of 3 if hStack
                let numToRemove = videoIds.length % 3;
                if (hStack && numToRemove > 0) videoIds = videoIds.slice(0, videoIds.length - numToRemove);
                console.log(`${videoIds.length} videos after hStack filter`);

                fs.writeFileSync(`${videoTmpDir}/videoIds.txt`, JSON.stringify(videoIds));
                fs.writeFileSync(`${videoTmpDir}/posts.json`, JSON.stringify(posts));
                console.log(`Finished filtering. ${videoIds.length} videos to resample`);
                response(videoIds);

            } catch (err) {
                console.error(`Compile.js > this.filterVids(): ${err}`);
            }
        });
    }

    this.moveFiles = async () => {
        try {
            let folders, files;
            folders = fs.readdirSync(videoTmpDir).filter(el => fs.lstatSync(`${videoTmpDir}/${el}`).isDirectory());
            await Promise.all(folders.map(async (folder) => {
                files = fs.readdirSync(`${videoTmpDir}/${folder}`);
                await Promise.all(files.map(async (file) => {
                    fs.renameSync(`${videoTmpDir}/${folder}/${file}`, `${videoTmpDir}/${file}`);
                }));
                fs.rmdirSync(`${videoTmpDir}/${folder}`);
            }));
        }
        catch (err) {
            console.log(`Compile.js > this.moveFiles(): ${err}`);
        }
    }

    this.start = async (posts, options) => {
        return new Promise(async (resolve, reject) => {
            try {
                let {color='black', days=1, likes=0, isLandscape=true, hStack=false, exBlockedSongs=false, exPartlyBlockedSongs=false, exUnmonetizableSongs=false, minLength=0, maxLength, width, height } = options;
                if (hStack) isLandscape=true; // if hStack then default to landscape

                switch (isLandscape) {
                    case true:
                        width = 1920;
                        height = 1080;
                        break;
                    case false:
                        width = 1080;
                        height = 1920;
                        break;
                    default:
                        width = 1920;
                        height = 1080;
                        break;
                };

                //await this.moveFiles(); // not needed since I download videos myself
                let videos = await this.filterVids(posts, options);
                await Download(posts.collector);
                await this.resample(videos, options);

                (!hStack) ? await this.compile(videos, color, width, height) : await this.hStack(videos, color, width, height);

                if (isLandscape && !hStack) {
                    await this.styleHorizontal(color);
                } else if (!isLandscape && !hStack) {
                    await this.styleVertical();
                }
                resolve(posts);
            }
            catch (err) {
                console.log(`Compile.start - Error: `,err);
            }
        });
    }

}

module.exports = Compile;
