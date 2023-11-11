const { getFirestore, collection, getDocs, addDoc, updateDoc, doc, setDoc,getDoc} = require('firebase/firestore');
const {firebase,admin}= require('../config')
const firestore = getFirestore(firebase);

const updatePost = async(req,res)=>{
  const myCollection = collection(firestore, 'Posts');
  const docRef = doc(myCollection, req.params.postId);
  try {
      await updateDoc(docRef, req.body);
      res.send({ message: 'Document successfully updated!' });
    } catch (error) {
      console.error('Error updating document: ', error);
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
  res.json({success:true, comment:'-1'});
}
  }
  catch(e){
      res.json({
          success:false,
          message:'something went wrong when get data from comment'
      })
  }
}
module.exports={ updatePost, addComment, getOneComment,}