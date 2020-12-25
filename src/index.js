/* eslint-disable no-shadow */
// Dependencies
import '@babel/polyfill/noConflict';

// Server
import server from './server';

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('The server is run!'); // eslint-disable-line
});
