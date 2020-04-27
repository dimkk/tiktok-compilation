const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

function Compile () {

  // Resample videos
  this.resample = (vid, i) => {
    return new Promise((resolve, reject) => {
      ffmpeg(`${process.cwd()}/video/tmp/${vid}`)
        .outputOptions([
          '-r 30',
          '-vf scale=w=1080:h=-1,pad=1080:1920:0:(oh/2-ih/2):black',
          '-acodec copy',
          '-crf 20',
          '-max_muxing_queue_size 1024'
        ])
        .save(`${process.cwd()}/video/tmp/${i}.mp4`)
        //.on('progress', p => console.log(`Processing video ${i}-${vid}: ${p.percent}`))
        .on('end', () => {
          console.log(`Finished resampling video ${i}-${vid}`);
          resolve();
        });
    });
  }

  // Compile and resize videos
  this.compile = async (videos) => {
    try {
      // List file names into .txt document
      return new Promise((resolve, reject) => {
        console.log('Compiling videos... hold your horses...');
        let listFileName = `${process.cwd()}/video/tmp/list.txt`,
            fileNames = '';

        videos.forEach((fileName, index) => {
            fileNames = fileNames + `file './${index}.mp4'\n`;
        });
        fileNames = [...new Set(fileNames.split('\n'))].join('\n'); // remove duplicates

        fs.writeFile(listFileName, fileNames, (err) => {
          if (err) console.log(`WriteFile Error: ${err}`);

          // Make video 1280x720
          ffmpeg(listFileName)
            .inputOptions(['-safe 0', '-f concat'])
            .outputOptions([
              '-filter:v scale=-1:1080,pad=1920:1080:(ow/2-iw/2):0:pink',
              '-max_muxing_queue_size 1024',
              '-crf 23',
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
      console.log('Styling video...')
      ffmpeg()
        .input(`${process.cwd()}/video/tmp/tmp1.mp4`)
        .input(`${process.cwd()}/video/logo.png`)
        .outputOptions([
          "-filter_complex [0:v][1:v]overlay=(300-75):(1080/2-150):[v1];[v1][1:v]overlay=(607+600+300-75):(1080/2-150):[v2],[v2]drawtext=fontfile=./fonts/Lobster-Regular.ttf:text='william':fontcolor=mistyrose:fontsize=48:x=1750:y=(1080-70)",
          '-crf 23',
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
        console.log(`Currently at video ${i}/${videos.length-1} - ${videos[i]}`);
        await this.resample(videos[i], i);
      }
      console.log('Completed resampling');
      await this.compile(videos);
      await this.style();
      resolve();
    });
  }
}

module.exports = Compile;