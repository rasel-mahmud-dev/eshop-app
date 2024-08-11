// SDK initialization
import * as fs from "fs";

const ImageKit = require("imagekit");

const imagekitInstance = new ImageKit({
    publicKey: process.env.IMAGE_KIT_publicKey,
    privateKey: process.env.IMAGE_KIT_privateKey,
    urlEndpoint: process.env.IMAGE_KIT_urlEndpoint,
});


function imageKitUpload(filePath, fileName, folderName) {
   return new Promise(async (resolve)=>{
       try{
           const file = fs.createReadStream(filePath);
           const response = await imagekitInstance.upload({file, fileName, folder: folderName, overwriteFile: false});
           resolve(response)
       } catch (ex){
           resolve(null)
       }
   })
}


export function imageKitAuthenticationParameters(){

    var imagekit = new ImageKit({
        publicKey: process.env.IMAGE_KIT_publicKey,
        privateKey: process.env.IMAGE_KIT_privateKey,
        urlEndpoint: process.env.IMAGE_KIT_urlEndpoint,
    });
    var authenticationParameters = imagekit.getAuthenticationParameters();

    return authenticationParameters
}

export default imageKitUpload

