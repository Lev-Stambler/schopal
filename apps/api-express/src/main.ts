import app from './app/app'

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
