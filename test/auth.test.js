const auth = require('../components/Auth');
// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

// test('fetch new authentication token', async (done) => {
//     const callback = data => {
//         try {
//             console.log('test data',data);
//             expect(data).toBe('string');
//             done();
//         } catch (error) {
//             done(error);
//         }
//     }

//     await auth().then(res => {
//         console.log('finished part1');
//         callback(res);
//     });
//   });

test('fetch new authentication token for uploading', () => {
    expect.assertions(1);
    return auth().then(data => expect(data).toBe('string'));
  });

// (async () => {
//     await auth().then(token => console.log(token));
// })();
