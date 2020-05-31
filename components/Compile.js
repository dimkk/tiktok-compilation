const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const fsPromises = fs.promises;
const { getVideoDurationInSeconds } = require('get-video-duration');

function Compile () {
  const colors = {
    'pink': ['Pink','MistyRose'],
    'blue': ['#6bc6ff','#bfe7ff'],
    'black': ['Black','LightSlateGray'],
    'blue2': ['#c0e6ff','#e1f5ff'],
    'orange': ['#ffdac0','#ffefe1'],
    'purple': ['#e5c0ff','#f2e1ff'],
    'red': ['#ffc0c0','#ffe1e1']
  };

  // Resample videos
  this.resample = (vid, i, color) => {
    return new Promise((resolve, reject) => {
      let bgColor = colors[color][0];
      ffmpeg(`${process.cwd()}/video/tmp/${vid}`)
        .outputOptions([
          '-r 30',
          '-filter:v scale=w=1080:h=-1,pad=1080:1920:0:(oh/2-ih/2):black',
          '-acodec copy',
          '-preset veryfast',
          '-max_muxing_queue_size 1024'
        ])
        .save(`${process.cwd()}/video/tmp/${i}.mp4`)
        .on('end', () => {
          console.log(`Finished resampling video ${i}-${vid}`);
          resolve();
        })
        .on('error', err => {
          ffmpeg(`${process.cwd()}/video/tmp/${vid}`)
            .outputOptions([
              '-r 30',
              `-vf scale=-1:1920,pad=1080:1920:(ow/2-iw/2):0:${bgColor}`,
              '-acodec copy',
              '-preset veryfast',
              '-max_muxing_queue_size 1024'
            ])
            .save(`${process.cwd()}/video/tmp/${i}.mp4`)
            .on('end', () => {
              console.log(`Finished resampling video ${i}-${vid}`);
              resolve();
            });
        });

    });
  }

  // Compile and resize videos
  this.compile = async (videos, color, width, height) => {
    try {
      // List file names into .txt document
      return new Promise((resolve, reject) => {
        console.log('Compiling videos...');
        let bgColor = (width === 1920) ? colors[color][0] : 'black';

        let listFileName = `${process.cwd()}/video/tmp/list.txt`,
            fileNames = '';

        videos.forEach((fileName, index) => {
            fileNames += `file './${index}.mp4'\n`;
        });
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
            .save(((width===1920) ? `${process.cwd()}/video/tmp/tmp1.mp4` : `${process.cwd()}/video/tmp/tmp1.mp4`)) // redundant currently to watermark vertical videos too
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
        .input(`${process.cwd()}/video/tmp/tmp1.mp4`)
        .input(`${process.cwd()}/video/logo.png`)
        .outputOptions([
          `-filter_complex [0:v][1:v]overlay=(300-75):(1080/2-150):[v1];[v1][1:v]overlay=(607+600+300-75):(1080/2-150):[v2],[v2]drawtext=fontfile=./res/Lobster-Regular.ttf:text='william':fontcolor=${txtColor}:fontsize=72:x=1675:y=(1080-80)`,
          '-preset veryfast', // try -preset veryfast
          '-acodec copy'
        ])
        .save(`${process.cwd()}/video/output.mp4`)
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
        .input(`${process.cwd()}/video/tmp/tmp1.mp4`)
        .outputOptions([
          `-filter_complex drawtext=fontfile=./res/Lobster-Regular.ttf:text='william':fontcolor=#F8F8FF@0.4:fontsize=64:x=40:y=(1920-64-20)`, //BottomLeft fontcolor=#F8F8FF@0.3:fontsize=64:x=40:y=(1920-64-20) TopRight fontcolor=#F8F8FF@0.2:fontsize=64:x=(1080-210-30):y=(50)
          '-preset veryfast',
          '-acodec copy'
        ])
        .save(`${process.cwd()}/video/output.mp4`)
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
            let len0, len1, len2, audioArr = [], audioIndex;

            // Create series of 3x videos side by side using audio from video 0
            console.log('Creating hStack videos...');

            for (let i=0; i<numLoops; i++) {
                await new Promise(async (resolve, reject) => {
                    console.log(`Loop number: ${i+1} - index ${i}`);
                    len0 = await getVideoDurationInSeconds(`${process.cwd()}/video/tmp/${i*3}.mp4`);
                    len1 = await getVideoDurationInSeconds(`${process.cwd()}/video/tmp/${i*3+1}.mp4`);
                    len2 = await getVideoDurationInSeconds(`${process.cwd()}/video/tmp/${i*3+2}.mp4`);
                    audioArr.push(len0,len1,len2);
                    audioIndex = audioArr.indexOf(Math.max(len0, len1, len2));
                    console.log(`Longest video duration is ${audioIndex}`);

                    ffmpeg(`${process.cwd()}/video/tmp/${i*3}.mp4`)
                        .input(`${process.cwd()}/video/tmp/${i*3+1}.mp4`)
                        .input(`${process.cwd()}/video/tmp/${i*3+2}.mp4`)
                        .outputOptions([
                            `-filter_complex [0:v][1:v][2:v]hstack=inputs=3[v4],[v4]scale=${width}:-1[v5],[v5]drawtext=fontfile=./res/Lobster-Regular.ttf:text='william':fontcolor=#F8F8FF@0.2:fontsize=64:x=40:y=(1080-64-20)[v6]`,
                            `-map [v6]`,
                            `-map ${audioIndex}:a`,
                            '-max_muxing_queue_size 1024',
                            '-preset veryfast',
                            '-ac 2'
                        ])
                        .save(`${process.cwd()}/video/tmp/hStack${i}.mp4`)
                        .on('end', () => {
                            console.log(`Finished creating hStack video: ${i+1}/${numLoops}`);
                            hStackNames += `file './hStack${i}.mp4'\n`;
                            resolve();
                        })
                        .on('error', (err,stdout,stderr) => console.log(`1hStack creation video rending error: ${err} ${stdout} ${stderr}`));
                });
                console.log(`Promise ${i+1} of ${numLoops} completed`);
            }

            // Create listFile of hStack videos
            console.log(`hStackNames: ${hStackNames}`);
            let hStackList = `${process.cwd()}/video/tmp/hStackList.txt`;

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
                .save(`${process.cwd()}/video/output.mp4`)
                .on('progress', p => console.log(`Rendering Compiled hStack video: ${p.percent}`))
                .on('end', () => resolve())
                .on('error', err => console.log(`hStack compilation video rending error: ${err}`));

        }).catch(err => console.log(`hStack Error: ${err}`));
    }
    catch (err) {
        console.log(`hStack Error: ${err}`);
    }
  }

  this.filterVids = async (posts, days, likes) => {
    return new Promise(async (resolve, reject) => {
      console.log('Filtering videos...');
      let videoIds = [];
      posts.collector.sort((a,b) => parseFloat(b.diggCount) - parseFloat(a.diggCount));

      // remove videos not within last X days
      const latestDate = new Date(new Date().setDate(new Date().getDate() - days));
      posts.collector = posts.collector.filter(e => {
        return new Date(e.createTime * 1000) > latestDate;
      });

      // remove videos with less than X likes
      posts.collector = posts.collector.filter(e => {
        return e.diggCount > likes;
      });

      //console.log(`Compile.js console: ${JSON.stringify(posts)}`);
      posts.collector.forEach(e => videoIds.push(`${e.id}.mp4`));

      // remove duplicates
      videoIds = [...new Set(videoIds)];

      fs.writeFileSync(`${process.cwd()}/video/tmp/videoIds.txt`, videoIds);
      console.log('Finished filtering videos');
      resolve(videoIds);
    });
  }

  this.start = async (posts, options) => {
    return new Promise(async (resolve, reject) => {
      let color = options.color || 'black',
          days = options.days || 1,
          likes = options.likes || 0,
          isLandscape = options.isLandscape || true,
          hStack = options.hStack || false,
          width, height;

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

      const videos = await this.filterVids(posts, days, likes);

      // Make sure multiple of 3 if hStack
      let numToRemove = videos.length % 3;
      if (hStack && numToRemove > 0) videos = videos.slice(0,videos.length-numToRemove);

      for (let i=0; i<videos.length; i++) {
        console.log(`Currently at video ${i+1}/${videos.length} - ${videos[i]}`);
        await this.resample(videos[i], i, color);
      }
      console.log('Completed resampling');
      (!hStack) ? await this.compile(videos, color, width, height) : await this.hStack(videos, color, width, height);

      if (isLandscape && !hStack) {
        await this.styleHorizontal(color);
      } else if (!isLandscape && !hStack) {
        await this.styleVertical();
      }
      resolve(posts);
    });
  }

}

module.exports = Compile;