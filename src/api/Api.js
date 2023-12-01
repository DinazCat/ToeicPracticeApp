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
const getPost = async ()=>{
    try{
        const response = await client.get('/getPosts')
        if(response.data.success){
            return {All:response.data.allP, Today: response.data.todayP}
        }
        else{
            console.log("not get")
        }
        
    }
    catch(error){
        console.log('error: ', error.message)
        return {All:[], Today:[]};
    }
  }
  const updatePost = async(id, data) => {
    const endpoint = '/updatePost/' + id;
    try {
        const response = await client.put(endpoint, data);
      } catch (error) {
        console.error('error: ', error.message);
    }
}
const deletePost = async(id)=>{
    try{
        await client.delete('/deletePost/'+id)    
    }
    catch(error){
        console.log('error: ', error.message)
    }
}
const getAllQuestion = async (part)=>{
    try{
        const response = await client.get('/getAllQuestion/'+part)
        if(response.data.success){
            return response.data.Questions
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
  const deleteQuestion = async(part,id)=>{
    try{
        await client.delete('/deleteQuestion/'+part+'/'+id)    
    }
    catch(error){
        console.log('error: ', error.message)
    }
}
const updateQuestion = async(part,id, data) => {
    const endpoint = '/updateQuestion/' + part+'/'+id;
    try {
        const response = await client.put(endpoint, data);
      } catch (error) {
        console.error('error: ', error.message);
    }
}
export default {addQuestion, countQuestion, getVocabLesson, addVocabLesson, addVocab, getPost, updatePost, deletePost,
     getAllQuestion,deleteQuestion, updateQuestion}


