const express = require('express');
// const firebase = require('firebase')
const { getFirestore, collection, getDocs,addDoc, updateDoc, doc, setDoc,getDoc} = require('firebase/firestore');
const firebase1= require('./config')
const firestore = getFirestore(firebase1);
const {retrieveUserToken, sendNotification} = require('./controllers/User')
const cron = require('node-cron')
const SendNoti= async()=>{
    // const list = querySnapshot.docs.map((doc) => doc.data());
    const myCollection = collection(firestore, 'Users');
    const querySnapshot = await getDocs(myCollection);
    const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const docId = doc.id;
        return { ...data, Id: docId };
      });
    list.forEach((user) => {
        user.vocabAlarms.forEach((item)=>{
            cron.schedule('*/1 * * * *', () => {
                sendNotification(user.token,item.Id);
              });
        })
      });
}
//cron.schedule('*/1 * * * *', () => {
    // Retrieve the user's token from the Firebase database
     //retrieveUserToken().then(token => { sendNotification(token, 'Your notification message');});
  
    // Send the notification using Firebase Cloud Messaging
//      sendNotification('cpHl1FofTlaaoutPH_tx9o:APA91bGY-D8ywJfeiNPEMESuV05RMwk44kdHJ52movwqT-Ntemwg0F6rvB81xjWdeayAMZLtRH5ClFRhi91cUk4B8oO5Ums91zqlI0qAiPM23yZncx7dogfSa3-mFvKSxFr6NGaq5qcd', 'Your notification message');
//   });
// const { getFirestore, collection, getDocs,addDoc } = require('firebase/firestore');
const cors = require('cors')
const app = express();
const router = require('./router/router1')
// const firebase1= require('./config')
// const firestore = getFirestore(firebase1);
// const myCollection = collection(firestore, 'Users');
// const db = firebase.firestore()
// const user = db.collection("trytemp")
app.use(express.json());
app.use(cors())
app.use('/api',router)
// app.post("/",async(req,res)=>{
    // const snapshot = await myCollection.get()
    // const list = snapshot.docs.map((doc)=>doc.data())
    // console.log(list)
    // res.send(list)
//     getDocs(myCollection)
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       res.send(doc.data());
//     });
//   })
//   .catch((error) => {
//     console.log('Error getting documents: ', error);
//   });
    // const data = req.body;
    // await myCollection.add(data)
    // console.log(data)
    // res.send({msg:"User added"});
//     try {
//         const data = { name: 'John', age: 30 }; // Replace with your own data
//         const docRef = await addDoc(collection(firestore, 'temp'), data);
//         console.log('Document written with ID: ', docRef.id);
//       } catch (error) {
//         console.error('Error adding document: ', error);
//       }
// })
// const interval = setInterval(SendNoti(), 1000);
// app.on("close", () => {
//     clearInterval(interval);
//   });
// app.listen(3000,()=>{
//     console.log('Port is listing')
// })
app.listen(3000,SendNoti())