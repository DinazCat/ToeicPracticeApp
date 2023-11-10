const express = require('express');
const {firebase,db}= require('./config')
const cron = require('node-cron')
const PORT = 3000;

const { getFirestore, collection, getDocs,addDoc, updateDoc, doc, setDoc,getDoc} = require('firebase/firestore');
const firestore = getFirestore(firebase);
const {retrieveUserToken, sendNotification} = require('./controllers/User')
const {get1PHistory} = require('./controllers/Question')

const SendNoti= async()=>{
    const myCollection = collection(firestore, 'Users');
    const querySnapshot = await getDocs(myCollection);
    const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const docId = doc.id;
        return { ...data, Id: docId };
      });
    list.forEach((user) => {
        if(user.vocabAlarms){
        user.vocabAlarms.forEach((item)=>{
            let timeParts = item.Time.split(/:| /);
            if (timeParts.length === 4) {
                if (timeParts[3] === "PM") {
                  timeParts[0] = String(parseInt(timeParts[0]) + 12);
                }
              } else {
                  timeParts[0] = String(parseInt(timeParts[0]));
              }
              
              let h = parseInt(timeParts[0]);
              let m = parseInt(timeParts[1]);
              let s = parseInt(timeParts[2]);
              let x = s + " " + m + " "+ h + " * * *"
            cron.schedule(x, () => {
                sendNotification(user.token,item.Id);
              });
        })
    }
      });
}
const cors = require('cors')
const app = express();
const router = require('./router/router1')

const http = require('http');
const server = http.createServer(app)
const {Server}= require("socket.io")
const io = new Server(server);
let userId = '6uz50o2mYWORgoBVzmYsHZYyq622';
io.on('connection', (socket) => {
//   console.log('New Client connected');
  socket.on('UserId',(data)=>{
    userId = data;
    console.log(data)
  })
  //realtime cho alarmVocab
  db.collection('Users').doc(userId)
  .onSnapshot((doc)=>{
    if (doc.exists) {
      const list = doc.data().vocabAlarms;
      const name = userId+'Alarmchange'
      io.emit(name, list)
    } else {
      const name = userId+'Alarmchange'
      io.emit(name, [])
    }
  })
    //realtime cho history home
    db.collection('Users').doc(userId)
    .onSnapshot((doc)=>{
      if (doc.exists) {
        const list = doc.data().HistoryPractice;
        if(list){
            const name = userId+'PHistorychange'
            get1PHistory(list).then(item => {io.emit(name, item)});
        }
      } 
    })
    //realtime cho Practice Plan
    db.collection('PracticePlan').doc(userId)
    .onSnapshot((doc)=>{
      if (doc.exists) {
        const list = doc.data();
        if(list){
            const name = userId+'PracticePlanChange'
            
            io.emit(name, list);
        }
      } 
    })
  // Xử lý khi client gửi yêu cầu
  socket.on('connect', (data) => {
    console.log("socket connected")
  });
});

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