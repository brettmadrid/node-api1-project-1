const server = require("./API/server");

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`\n*** Server up and running on port ${PORT} ***\n`);
});
