const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, setDoc,getDoc} = require('firebase/firestore');
const {firebase, admin} = require('../config')
const firestore = getFirestore(firebase);
//const admin = require('firebase-admin');
const serviceAccount = require('../asset/toeicpracticeapp-9dc19-firebase-adminsdk-eqpy0-2c7a132769.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
  const messaging = admin.messaging();
// const retrieveUserToken = async ()=>{
//     const uid = '6uz50o2mYWORgoBVzmYsHZYyq622';
//     const token = await admin.auth().createCustomToken(uid)
//       .then((customToken) => {
//         // console.log('Custom token:', customToken);
//         return customToken
//       })
//       .catch((error) => {
//         console.error('Error creating custom token:', error);
//       });
//       return token
// }
const retrieveUserToken = async()=>{
    const myCollection = collection(firestore, 'Users');
    try{
        const querySnapshot = await getDocs(myCollection);
        const docRef = doc(myCollection, req.params.userId);
        const documentSnapshot = await getDoc(docRef);
  
        if (documentSnapshot.exists()) {
          const data = documentSnapshot.data().token;
        //   res.json({success:true, vocabAlarm:data});
        } else {
          console.log('Document does not exist.');
        //   res.json({success:true, vocabAlarm:'-1'});
        }
        }
        catch(e){
            console.log(e);
            res.json({
              success: false,
              message: "something went wrong when get data from getVocabs",
            });
            return [];
        }
  //   return token
}
const createNotiBody = async(id)=>{
    const myCollection = collection(firestore, 'Vocabulary');
    const docRef = doc(myCollection, id);
    const documentSnapshot = await getDoc(docRef);
  
  if (documentSnapshot.exists()) {
    const data = documentSnapshot.data()
    const body = data.Vocab +" "+ data.Spelling +" ("+ data.Type +") "+ data.Translate
    return body
  } else {
    console.log('Document does not exist.');
  }
}
const sendNotification=async(token, message)=>{
    let data = '';
    await createNotiBody(message).then(item => { data = item});
    const notificationPayload = {
      notification: {
        title: 'Alarm Vocab',
        body: data,
      },
    };
  
    // Send the notification to the specific user's token
    admin.messaging().sendToDevice(token, notificationPayload)
      .then((response) => {
        console.log('Notification sent successfully:', response.results);
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
      });
    //console.log("token"+token)
    // admin.messaging().send({
    //     token: token,
    //     notification: notificationPayload.notification,
    // })
    // .then((response) => {
    //     console.log('Notification sent successfully:', response);
    // })
    // .catch((error) => {
    //     console.error('Error sending notification:', error);
    // });
  }
  const setUserInfo = async (req, res) => {
    try {
      const myCollection = collection(firestore, 'Users');
      const docRef1 = doc(myCollection, req.params.userId);
      await setDoc(docRef1, req.body);
      console.log("Document successfully set!");
      res.send({ message: 'User data set successfully' });
    } catch (error) {
      console.error("Error setting user document: ", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const updateUser = async (req, res) => {
    try {
      const myCollection = collection(firestore, 'Users');
      const docRef1 = doc(myCollection, req.params.userId);

      await updateDoc(docRef1, req.body);
      console.log("Document successfully updated!");
      res.send({ message: 'User data set successfully' });
    } catch (error) {
      console.error("Error updating user document: ", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const getUserData = async (req, res) => {
    try {

      const myCollection = collection(firestore, 'Users');
      const docRef1 = doc(myCollection, req.params.userId);
      const documentSnapshot = await getDoc(docRef1);

      if (documentSnapshot.exists()) {
        res.send({ success: true, userData: documentSnapshot.data() });
      } else {
        res.status(404).send({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error("Error get user document: ", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const getAllUsers = async (req, res) => {
    const myCollection = collection(firestore, 'Users');
    try{
    const querySnapshot = await getDocs(myCollection);
    const list = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data };
    });
    res.json({success:true, users:list});
    }
    catch(e){
        res.json({success:false, message: error.message})
        console.log(e)
    }
  };
  module.exports={retrieveUserToken, sendNotification, setUserInfo, updateUser, getAllUsers, getUserData}