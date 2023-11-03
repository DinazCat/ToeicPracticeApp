const { getFirestore, collection, getDocs,addDoc, updateDoc, doc, setDoc,getDoc} = require('firebase/firestore');
const {firebase}= require('../config')
const firestore = getFirestore(firebase);
// const myCollection = collection(firestore, 'VocabLesson');
const getVocabLesson = async (req,res)=>{
    const myCollection = collection(firestore, 'VocabLesson');
    try{
    const querySnapshot = await getDocs(myCollection);
    // const list = querySnapshot.docs.map((doc) => doc.data());
    const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const docId = doc.id;
        return { ...data, Id: docId };
      });
    res.json({success:true, vocablesson:list});
    }
    catch(e){
        res.json({
            success:false,
            message:'something went wrong when get data from vocablesson'
        })
        console.log(e)
    }
}
 const getVocabs = async (req,res)=>{
    const myCollection = collection(firestore, 'Vocabulary');
    try{
        const querySnapshot = await getDocs(myCollection);
        // const list = querySnapshot.docs.map((doc) => doc.data());
        const list = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const docId = doc.id;
            return { ...data, Id: docId };
          });
         res.json({success:true, vocabs:list});
         return list
        }
        catch(e){
            console.log(e);
            res.json({
              success: false,
              message: "something went wrong when get data from getVocabs",
            });
            return [];
        }
 }
//  const filterVocab = async(IdLesson) => {
//   const result = await getVocabs(null, {});
//   const list = result.filter(i=>i.TopicId == IdLesson);
//     return list
//  }
 const getVocabinLesson = async (req,res)=>{
  const myCollection = collection(firestore, 'Vocabulary');
    try {
     //   const list =  getVocabs();
     //   const list1 =  list.filter(i=>i.TopicId == req.params.TopicId);
         const querySnapshot = await getDocs(myCollection);
         // const list = querySnapshot.docs.map((doc) => doc.data());
         const list = querySnapshot.docs.map((doc) => {
          if(doc.data().TopicId == req.params.TopicId){
             const data = doc.data();
             const docId = doc.id;
             return { ...data, Id: docId };
          }
           });
          res.json({success:true, vocabs:list});
    } catch (e) {
      console.log(e);
      res.json({
        success: false,
        message: "something went wrong when get data from getVocabinLesson"+e,
      });
      return [];
    }

 }
 const setAlarmVocab = async(req,res)=>{
    const myCollection = collection(firestore, 'Users');
    const docRef1 = doc(myCollection, req.params.userId);
    try {
      const docRef = await setDoc(docRef1, req.body );
      console.log("Document written ");
      res.send({ message: 'Data saved successfully' });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
 }

 const getAlarmVocab = async (req,res)=>{
    const myCollection = collection(firestore, 'Users');
    const docRef = doc(myCollection, req.params.userId);
    try{
    const documentSnapshot = await getDoc(docRef);
  
  if (documentSnapshot.exists()) {
    const data = documentSnapshot.data().vocabAlarms || [];
    res.json({success:true, vocabAlarm:data});
  } else {
    console.log('Document does not exist.');
    res.json({success:true, vocabAlarm:'-1'});
  }
    }
    catch(e){
        res.json({
            success:false,
            message:'something went wrong when get data from vocablesson'
        })
        console.log(e)
    }
}
const updateAlarmVocab = async(req,res)=>{
    const myCollection = collection(firestore, 'Users');
    const docRef = doc(myCollection, req.params.userId);
    try {
        await updateDoc(docRef, req.body);
        console.log('Document successfully updated!');
        res.send({ message: 'Document successfully updated!' });
      } catch (error) {
        console.error('Error updating document: ', error);
      }
}
module.exports={getVocabLesson, getVocabinLesson, getVocabs, setAlarmVocab, getAlarmVocab, updateAlarmVocab}