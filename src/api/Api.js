import client from "./client";

const addQuestion = async (part, data) => {
    const endpoint = "/Question/"+part+"/add"
    try{
      const response = await client.post(endpoint, data)
      console.log(response.data.message)      
    }
    catch(error){
      console.log('error: ', error.message)
    }
}
const countQuestion = async (part)=>{
  try{
      const response = await client.get("/countQuestion/"+part)
      if(response.data.success){
          return response.data.Order
      }
      else{
          console.log("not get")
          return 0;
      }
      
  }
  catch(error){
      console.log('error: ', error.message)
      return 0;
  }
}
const getVocabLesson = async ()=>{
  try{
      const response = await client.get('/VocabLessons')
      if(response.data.success){
          return response.data.vocablesson
      }
      else{
          console.log("not get")
      }
      
  }
  catch(error){
      console.log('error: ', error.message)
      return [];
  }
}
// router.post('/addVocabLesson', addVocabLesson)
// router.post('/addVocab', addVocab)
const addVocabLesson = async(data)=>{
  try{
      const response = await client.post('/addVocabLesson',data)
          return response.data.TopicId  
  }
  catch(error){
      console.log('error: ', error.message)
  }
}
const addVocab = async(data)=>{
  try{
      const response = await client.post('/addVocab',data)
          return response.data 
  }
  catch(error){
      console.log('error: ', error.message)
  }
}
export default {addQuestion, countQuestion, getVocabLesson, addVocabLesson, addVocab}


