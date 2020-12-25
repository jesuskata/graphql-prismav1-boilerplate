// Dependencies
import '@babel/register';
import '@babel/polyfill/noConflict';
import server from '../../src/server';

module.exports = async () => {
  global.httpServer = await server.start({ port: 4000 });
};
