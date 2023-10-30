const express = require('express');
// const firebase = require('firebase')
const { getFirestore, collection, getDocs,addDoc, updateDoc, doc, setDoc,getDoc} = require('firebase/firestore');
const firebase= require('./config')
const firestore = getFirestore(firebase);
const {retrieveUserToken, sendNotification} = require('./controllers/User')
const cron = require('node-cron')
const PORT = 3000

const cors = require('cors')
const app = express();
const router = require('./router/router1')

app.use(express.json());
app.use(cors())
app.use('/api',router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// app.on("close", () => {
//     clearInterval(interval);
//   });