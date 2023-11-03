const express = require('express');
const {firebase}= require('./config')
const cron = require('node-cron')
const PORT = 3000

const cors = require('cors')
const app = express();
const router = require('./router/router1')

// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cors())
app.use('/api',router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// app.on("close", () => {
//     clearInterval(interval);
//   });