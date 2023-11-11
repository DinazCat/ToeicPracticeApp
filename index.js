const express = require('express');
const cron = require('node-cron')
const PORT = 3000;


const cors = require('cors')
const app = express();
const router = require('./router/router1')

const http = require('http');
const server = http.createServer(app)



// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cors())
app.use('/api',router)

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// })
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
}

// app.on("close", () => {
//     clearInterval(interval);
//   });
module.exports = server;