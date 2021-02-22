import axios from "axios";


export const assetsListAll = axios.create({  //list assets on db
  baseURL: "http://localhost:3030/assets",
  timeout: 1000,
});

export async function assetCreate(assetData) { //register asset on db
  try{
   await axios.post("http://localhost:3030/assets", assetData)
   .then(res => {
     console.log(assetData);
     console.log(res);
     console.log(res.data);
   })
  } catch(err){
    console.log(err);
  }
  
}

export async function assetDelete() {
  
}
