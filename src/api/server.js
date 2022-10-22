import Cookies from "js-cookie";
const axios=require('axios');
const SERVER_URL="https://onlinewindow.glitch.me"
// const SERVER_URL="http://localhost:3000"
const getRequest=async(url)=>{
    try{
        let res=await fetch(`${SERVER_URL}/${url}`,{
            credentials: 'same-origin',
            method:"GET",
            mode:"cors",
            headers:{"Accept":"application/json","token":Cookies.get("token")},
        })
        res=await res.json()
        return res;
    }
    catch(e){
        console.log(e)
        return {status:false,error:"Server Error..."}
    }
}
async function getRequestFile(imageUrl,extention="jpg,png") {
    // Fetch the image.
    const response = await fetch(imageUrl,{
        headers:{token:Cookies.get("token")}
    });
  
    // Convert the data to Base64 and build a data URL.
    const binaryData = await response.arrayBuffer();
    const base64 = arrayBufferToBase64(binaryData);
    const dataUrl = `data:application/${extention};base64,${base64}`;
    console.log(dataUrl)
    // Update the source of the image.
    return dataUrl;
  }
  function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

const postRequest=async(url,body)=>{
    try{
        let res=await fetch(`${SERVER_URL}/${url}`,{
            credentials: 'same-origin',
            method:"POST",
            mode:"cors",
            headers:{"content-type":"application/json","Accept":"application/json","token":Cookies.get("token")},
            body:JSON.stringify(body)
        })
        res=await res.json()
        if(res.token)
            Cookies.set('token', res['token'])
        return res;
    }
    catch(e){
        console.log(e)
        return {status:false,error:"Server Error..."}
    }
}

const postRequestFile=async(url,body)=>{
    try{
        // body.append("token",Cookies.get("token"))
        var config={'content-type':'multipart/form-data',"token":Cookies.get("token")}
        let res=await axios.post(`${SERVER_URL}/${url}`,body,{
            headers:config
        })
        return res.data;
    }
    catch(e){
        if(e && e.response && e.response.data){
            return e.response.data
        }
        return {status:false,error:"Server Error..."}
    }
}

const putRequest=async(url,body)=>{
    try{
        let res=await fetch(`${SERVER_URL}/${url}`,{
            method:"PUT",
            headers:{"content-type":"application/json","token":Cookies.get("token")},
            body:JSON.stringify(body)
        })
        res=await res.json()
        return res;
    }
    catch(e){
        console.log(e)
        return {status:false,error:"Server Error..."}
    }
}

const deleteRequest=async(url)=>{
    try{
        let res=await fetch(`${SERVER_URL}/${url}`,{
            method:"DELETE",
            headers:{"content-type":"application/json","token":Cookies.get("token")},
        })
        res=await res.json()
        return res;
    }
    catch(e){
        console.log(e)
        return {status:false,error:"Server Error..."}
    }
}

export {SERVER_URL,getRequestFile,getRequest,postRequest,postRequestFile,putRequest,deleteRequest};