const { v2: cloudinary } = require("cloudinary");

export const cloudinaryHandler = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    return cloudinary;
};

// export const uploadImage = (imagePath: string, options?: { dir?: string; fieldName?: string; overwrite?: boolean }) => {
export const uploadImage = (imagePath, options) => {
    return new Promise(async (resolve, reject) => {
        try {
            let s = await cloudinaryHandler().uploader.upload(imagePath, {
                use_filename: true,
                unique_filename: false,
                folder: options?.folder ? options.folder : "",
                overwrite: options?.overwrite ? options.overwrite : false,
            });
            resolve({ ...s, fieldName: options?.fieldName });
        } catch (ex) {
            reject(ex);
        }
    });
};
