import client from "./client";

export const addQuestion = async (part, data) => {
    const endpoint = "/Question/"+part+"/add"
    try{
      const response = await client.post(endpoint, data)
      console.log(response.data.message)      
    }
    catch(error){
      console.log('error: ', error.message)
    }
}


