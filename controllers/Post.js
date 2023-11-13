const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, setDoc,getDoc} = require('firebase/firestore');
const {storage} = require('firebase/storage')
const {firebase,admin,db}= require('../config')
const firestore = getFirestore(firebase);

  const {uploadImage} = require('./User')
  const uploadVideo = async(video)=>{
    const bucket = admin.storage().bucket();
    return new Promise((resolve, reject) => {
  
      const timestamp = new Date().getTime().toString();

      const destination = `Videos/video${timestamp}.mp4`;

      const options = {
        contentType: 'video/mp4'
      };
  
      // Upload file lên Firebase Storage
      bucket.upload(video, {
        destination: destination,
        ...options
      }, function(err, file) {
        if (err) {
          reject(err);
          return;
        }
  
        // Lấy URL của file vừa upload
        file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491' // Thay thế bằng thời gian hết hạn theo mong muốn
        }, function(err, url) {
          if (err) {
            reject(err);
            return;
          }
  
          resolve(url);
        });
      });
    });
  }
const addPost = async(req,res)=>{
    const myCollection = collection(firestore, 'Posts');
    try{
      const data = req.body;
      if(data.postImg != null)
      for(let i = 0; i < data.postImg.length; i++){
        if(data.postImg[i].type=='img'){
          await uploadImage(data.postImg[i].uri).then((x)=>{
            data.postImg[i].uri = x      
          })
        }
        else{
          await uploadVideo(data.postImg[i].uri).then((x)=>{
            data.postImg[i].uri = x  
            console.log('x:'+x)    
          })
        }
      }
      
      await addDoc(myCollection, data)
      .then((docRef) => {
        const d = doc(myCollection, docRef.id);
        updateDoc(d, {postId:docRef.id});
        res.send({ message: 'Data saved successfully' });
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    }
    catch(error){
        console.error("Error addpost: ", error);
    }
}
const updatePost = async(req,res)=>{
  const myCollection = collection(firestore, 'Posts');
  const docRef = doc(myCollection, req.params.postId);
  try {
      await updateDoc(docRef, req.body);
      console.log('Document successfully updated!');
      res.send({ message: 'Document successfully updated!' });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
}
const updateCommentTree =async(sign, id, momId)=>{
  if(sign=='noreply'){

    const collectionRef = admin.firestore().collection('Posts');
const docRef = collectionRef.doc(momId);

docRef.update({ comments: admin.firestore.FieldValue.arrayUnion(id) });
  }
  else{
    const collectionRef = admin.firestore().collection('Comments');
    const docRef = collectionRef.doc(momId);
    docRef.update({ replies: admin.firestore.FieldValue.arrayUnion(id) });
  }
}

const addComment = async(req,res)=>{
  const myCollection = collection(firestore, 'Comments');
  try{
    const data = req.body;
    await addDoc(myCollection, data)
    .then((docRef) => {
      const d = doc(myCollection, docRef.id);
      updateDoc(d, {commentId:docRef.id});
      updateCommentTree(req.params.sign,docRef.id,req.params.momId)
      res.send({ message: 'Data saved successfully' });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  }
  catch(error){
    console.error("Error addcomment: ", error);
  }
}
const getOneComment = async (req,res)=>{
  const myCollection = collection(firestore, 'Comments');
  const docRef = doc(myCollection, req.params.commentId);
  try{
  const documentSnapshot = await getDoc(docRef);

if (documentSnapshot.exists()) {
  const data = documentSnapshot.data();
  res.json({success:true, comment:data});
} else {
  console.log('Document does not exist.');
  res.json({success:true, comment:'-1'});
}
  }
  catch(e){
      res.json({
          success:false,
          message:'something went wrong when get data from comment'
      })
      console.log(e)
  }
}

const addNotification = async(req,res)=>{
  const myCollection = collection(firestore, 'Notification');
  try{
    const data = req.body;
    await addDoc(myCollection, data)
    .then((docRef) => {
      const d = doc(myCollection, docRef.id);
      updateDoc(d, {Id:docRef.id});
      sendNotification(docRef.id)
      
      res.send({ message: 'Data saved successfully' });
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  }
  catch(error){
    console.error("Error addcomment: ", error);
  }
}
const deleteNotification = async (req, res) => {
  try {
    const documentRef = db.collection('Notification').doc(req.params.notiId);
    await documentRef.delete();
    console.log('Document deleted successfully.');
  } catch (error) {
    console.log('Error deleting document:', error);
  }
}
const updateNotification = async(req,res)=>{
  const myCollection = collection(firestore, 'Notification');
  const docRef = doc(myCollection, req.params.notiId);
  try {
      await updateDoc(docRef, req.body);
      console.log('Document successfully updated!');
      res.send({ message: 'Document successfully updated!' });
    } catch (error) {
      console.error('Error updating document: ', error);
    }
}
const getDataUser=async(id)=>{
  const Collection = collection(firestore, 'Users');
  const docRef = doc(Collection, id);
  const rep = await getDoc(docRef);
  return rep.data()
}
const sendNotification=async(id)=>{
  const myCollection = collection(firestore, 'Notification');
  const docRef = doc(myCollection, id);
  const documentSnapshot = await getDoc(docRef);
  const noti = documentSnapshot.data()

  let Guestname= '';
  let token='';
  await getDataUser(noti.PostownerId).then(item => {token = item.token});
  await getDataUser(noti.guestId).then(item => {Guestname = item.name});
  const notificationPayload = {
    notification: {
      title: 'Coco',
      body: Guestname +" "+noti.text,
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
}
module.exports={addPost, uploadVideo, updatePost, addComment, getOneComment, addNotification, deleteNotification,updateNotification}