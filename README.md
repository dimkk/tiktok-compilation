# Tiktok Compilations Videos
This project compiles tiktok videos and uploads them to Youtube for viewers to enjoy

Notes:
- A json file of music to avoid located in `res/excludeSongs.json` is used and constantly updated to ensure compliance with Youtube guidelines

## Running the project
Clone the project, and run `npm install` and `node app` in the project root. With the current settings, it should generate a short video demonstrating the code's ability to compile videos.

Issues: The code may not currently work as certian tiktok videos may not be freely available.

## Notes for Google Credits
To view the code for authenticating and uploading the video, please see `components/Auth.js` and `components/Upload.js`