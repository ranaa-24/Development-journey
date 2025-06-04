import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getEnhancedImage = async (file: File): Promise<string> => {  /// async return must be promise<T> 
    let enhancedImageUrl: string = "";

    try{
        const taskId = await uploadImage(file);
        console.log("Image uploaded");
        
        // we get the res even if the enhanced image not yet ready.. so we need to pool and check the image is ready oor not..
        enhancedImageUrl= await poolingEnhancedImage(taskId);
        
        }catch(err){
            console.log((err as Error).message);
            alert("Unknown error occurred. probably our fault, Please retry with different image file.");     
            window.location.reload();
    }
        
    return enhancedImageUrl;    
};


const uploadImage = async(file:File): Promise<string> => {
    const formData = new FormData();
    formData.append("image_file", file);

    const {data} = await axios.post(`${baseUrl}/api/tasks/visual/scale`, formData, {
        headers: {
          "X-API-KEY": apiKey,
        }
    })

    if(!data?.data?.task_id) throw new Error("Error whilie fetching task_id");

    return data.data.task_id;
}

const getEnhancedImageRes = async(taskId: string) => {
    const url = `${baseUrl}/api/tasks/visual/scale/${taskId}`;

    const {data} = await axios.get(url, {
        headers: {
          "X-API-KEY": apiKey,
        }
    })
        
    if(!data?.data) throw new Error("Error Fetching Data");

    return data.data;
}

const poolingEnhancedImage = async(taskId: string, numberOfPoolingReq:number = 0): Promise<string> => {
    const data = await getEnhancedImageRes(taskId);

    if(data.state == 4){
        console.log("Processing..");
        if(numberOfPoolingReq > 20) throw new Error("Its Probably our fault, Unknown Error occurred");
        // wait 2s and call again
        await new Promise(res => setTimeout(res, 2000));
        return poolingEnhancedImage(taskId, numberOfPoolingReq+1);
    }

    if(data.state != 1){
        throw new Error("Invalid file");
    }

    return data.image;
}