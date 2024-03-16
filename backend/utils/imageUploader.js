const cloudinary =require('cloudinary').v2

exports.uploadImageToCloudinary = async(file,folder,height,quality)=>{
    const option = {folder};
    if(height){
        option.height = height;
    }
    if(quality){
        option.quality = quality;
    }
    option.resource_type = "autp";

  return  await cloudinary.uploader.upload(file.tempFilePath,option);
}