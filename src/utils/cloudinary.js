import cloudinary from "../config/cloudinary";

export const uploadImage = async (filePath, publicId) => {
  const option = {
    unique_filename: false,
    use_filename: true,
    overwrite: true,
    folder: "/blogImages",
    timeout: 60000,
  };

  if (publicId) {
    option.public_id = publicId;
  }

  const result = await cloudinary.uploader.upload(filePath, option);
  //   console.log(result, "result");
  return result.secure_url;
};
