import { v2 as cloudinary } from "cloudinary"

const uploadFile = async (file, currentFileUrl=null) => {
    if (currentFileUrl) {
        const fileId = currentFileUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(fileId);
    }
    const uploadedResponse = await cloudinary.uploader.upload(file);
    return uploadedResponse.secure_url;
};

export default uploadFile;