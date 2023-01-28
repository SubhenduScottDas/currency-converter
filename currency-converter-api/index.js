const http = require("http");
const app = require("./app");
const nosql = require("./db/nosql");

nosql.connect();

const server = http.createServer(app);
const { API_PORT } = process.env;

const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
