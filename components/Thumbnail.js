const Jimp = require('jimp');
const download = require('image-downloader');

const Thumbnail = async (posts) => {
  try {
    await new Promise(async (resolve, reject) => {
      // Download first 3 video thumbnails
      for (let i=0; i<Math.min(3); i++) {
        await download.image({
            url: posts.collector[i].covers.default,
            dest: `${process.cwd()}/img/tmp/${i}.jpg`
        });
      }
      
      const bg = await Jimp.read(`${process.cwd()}/img/bg.png`)
      const logo = await Jimp.read(`${process.cwd()}/img/logo.png`);
      const image0 = await Jimp.read(`${process.cwd()}/img/tmp/0.jpg`);
      const image1 = await Jimp.read(`${process.cwd()}/img/tmp/1.jpg`);
      const image2 = await Jimp.read(`${process.cwd()}/img/tmp/2.jpg`);

      const coord = new function() {
        this.margin = 8;
        this.logoWidth = 350;
        this.logoRotate = 340;
        this.imageWidth = (bg.bitmap.width-this.margin*4)/3;
        this.imageHeight = bg.bitmap.height-this.margin*2;
        this.logoX = this.margin + this.imageWidth - this.logoWidth * 1/2 - this.margin/2;
        this.logoY = bg.bitmap.height * 1/2 - this.logoWidth/2 - this.margin;
        this.imageY = this.margin;
        this.image0X = this.margin;
        this.image1X = this.margin * 2 + this.imageWidth;
        this.image2X = this.margin * 3 + this.imageWidth * 2;
      }

      // Resize Images
      logo.resize(coord.logoWidth, Jimp.AUTO);
      logo.rotate(coord.logoRotate, Jimp.RESIZE_BICUBIC);
      image0.resize(coord.imageWidth, coord.imageHeight);
      image1.resize(coord.imageWidth, coord.imageHeight);
      image2.resize(coord.imageWidth, coord.imageHeight);

      // Add images to thumbnail
      bg.composite(image0, coord.image0X, coord.imageY);
      bg.composite(image1, coord.image1X, coord.imageY);
      bg.composite(image2, coord.image2X, coord.imageY);
      bg.composite(logo, coord.logoX, coord.logoY);

      await bg.writeAsync(`${process.cwd()}/video/thumbnail.png`);
      console.log('Thumbnail generated');
      resolve();
    });

  }
  catch (err) {
    console.log(`Thumbnail Error: ${err}`);
  }
}

module.exports = Thumbnail;

