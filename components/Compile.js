const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

function Compile () {

  const waitFor = ms => new Promise(r => setTimeout(r, ms));

  // Resample videos
  this.resample = (vid, i) => {
    return new Promise((resolve, reject) => {
      ffmpeg(`${process.cwd()}/video/tmp/${vid}`)
        .outputOptions(['-r 30', '-vf scale=w=720:h=1280', '-acodec copy', '-crf 20'])
        .save(`${process.cwd()}/video/tmp/tmp${vid}`)
        //.on('progress', p => console.log(`Processing video ${i}-${vid}: ${p.percent}`))
        .on('end', () => {
          console.log(`Finished resampling video ${i}-${vid}`);
          resolve();
        });
    });
  }

  // Compile and resize videos
  this.resize = async (videos) => {
    try {
      // List file names into .txt document
      return new Promise((resolve, reject) => {
        console.log('resizing videos');
        let listFileName = `${process.cwd()}/video/tmp/list.txt`,
            fileNames = '';

        videos.forEach((fileName, index) => {
            fileNames = fileNames + `file './tmp${fileName}'\n`;
        });
        fileNames = [...new Set(fileNames.split('\n'))].join('\n'); // remove duplicates

        fs.writeFile(listFileName, fileNames, (err) => {
          if (err) console.log(`WriteFile Error: ${err}`);

          //waitFor(4000);
          //console.log('waiting for 4 seconds');

          // Make video 1280x720
          ffmpeg(listFileName)
            .inputOptions(['-safe 0', '-f concat'])
            .outputOptions([
              '-filter:v scale=-1:1080,pad=1920:1080:(ow/2-iw/2):0:black',
              '-acodec copy'
            ])
            .save(`${process.cwd()}/video/tmp/tmp1.mp4`)
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
  this.style = async () => {
    return new Promise(resolve => {
      ffmpeg()
        .input(`${process.cwd()}/video/tmp/tmp1.mp4`)
        .input(`${process.cwd()}/video/logo.png`)
        .outputOptions([
          "-filter_complex [0:v][1:v]overlay=(300-75):(1080/2-150):[v1];[v1][1:v]overlay=(607+600+300-75):(1080/2-150):[v2],[v2]drawtext=fontfile=./fonts/Lobster-Regular.ttf:text='william':fontcolor=slategray:fontsize=48:x=1750:y=(1080-70)",
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

  this.start = async (videos) => {
    return new Promise(async (resolve, reject) => {
      for (let i=0; i<videos.length; i++) {
        console.log(`Currently at video ${i}/${videos.length} - ${videos[i]}`);
        await this.resample(videos[i], i);
      }
      console.log('Completed resampling');
      await this.resize(videos);
      await this.style();
      resolve();
    });
  }
}

module.exports = Compile;