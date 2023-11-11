const { getFirestore, collection, getDocs,addDoc, updateDoc, doc, setDoc,getDoc, query,where} = require('firebase/firestore');
const {firebase}= require('../config')
const firestore = getFirestore(firebase);

const getMaxquestion = async (userId, Part)=>{
    const myCollection = collection(firestore, 'Users');
    const docRef = doc(myCollection, userId);
    try{
    const documentSnapshot = await getDoc(docRef);
  
  if (documentSnapshot.exists()) {
    if(Part == 'ListenPart1'||Part=='L1'){
    const data = documentSnapshot.data().MaxQuestion?.L1 || 0;
    return data;
    }
  } else {
   return 0;
  }
    }
    catch(e){
      console.error('Error get document: ', e);
      return 0;
    }
}
const getQuestion = async (req,res)=>{
    const myCollection = collection(firestore, req.params.Part);
    try {
      let max = 0;
      await getMaxquestion(req.params.userId, req.params.Part).then((item) => {
        max = item;
      })
      const num = parseInt(req.params.number)+parseInt(max)
      const queryConstraints = [where("Order", ">", max),where("Order", "<=", num)];
      const q = query(
        myCollection,
        ...queryConstraints
      );
      const querySnapshot = await getDocs(q);
      const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const docId = doc.id;
        return { ...data, Id: docId };
      });
      res.json({ success: true, Questions: list });
    } catch (e) {
      res.json({
        success: false,
        message: "something went wrong when get data from getQuestion",
      });
    }
 }
 const pushHistoryUser1 = async (userId, id, part, quantity, sign) => {
   const myCollection = collection(firestore, "Users");
   const docRef = doc(myCollection, userId);
   try {
     const documentSnapshot = await getDoc(docRef);
     if (documentSnapshot.exists()) {
       const userData = documentSnapshot.data();
       const data = userData.HistoryPractice || [];
       data.unshift(id);
       await updateDoc(docRef, { HistoryPractice: data });
       if (sign != "noMax") {
         let max = 0;
         await getMaxquestion(userId, part).then((item) => {
           max = item;
         });
         const num = parseInt(quantity) + parseInt(max);
         if (part == "L1") {
           const data2 = documentSnapshot.data().MaxQuestion || { L1: num };
           data2.L1 = num;
           await updateDoc(docRef, { MaxQuestion: data2 });
         }
       }
     } 
     else {
       const data = {
         HistoryPractice: [id],
       };
       await setDoc(docRef, data);
     }
   } catch (error) {
    console.error('Error pushHistoryUser1: ', error);
   }
 };
 const pushPracticeHistory = async(req,res)=>{
    const myCollection = collection(firestore, 'PracticeHistory');
    const data = req.body;
    await addDoc(myCollection, data)
    .then((docRef) => {
      res.send({ message: 'Data saved successfully' });
      pushHistoryUser1(req.params.userId,docRef.id, req.body.Part, req.body.Quantity,req.params.sign)
    })
    .catch((error) => {
      console.error('Error adding document pushHistory: ', error);
    });
 }
 const getOneQuestion = async(req,res)=>{
  const myCollection = collection(firestore, req.params.Part);
    const docRef = doc(myCollection, req.params.Qid);
    try{
    const documentSnapshot = await getDoc(docRef);
  
  if (documentSnapshot.exists()) {
    const data = {...documentSnapshot.data(),Id: documentSnapshot.id}
    res.json({success:true, question:data});
  } else {
    res.json({success:true, question:{}});
  }
    }
    catch(e){
      console.error('Error get document: ', e);
    }
 }
const get1PHistory = async(list)=>{
  const myCollection = collection(firestore, 'PracticeHistory');
  const dataList=[];
  for(let i = 0; i < list.length; i++){
    const docRef = doc(myCollection, list[i]);
    try{
    const documentSnapshot = await getDoc(docRef);
  
  if (documentSnapshot.exists()) {
    const data = {...documentSnapshot.data(), Id: documentSnapshot.id};
    dataList.push(data)
  } 
    }
    catch(e){
      console.error('Error get document: ', e);
    }
  }
  return dataList;
 }
 module.exports={getQuestion, pushPracticeHistory, getOneQuestion, get1PHistory,getMaxquestion,pushHistoryUser1}