const cloudinary = require("../../../config/cloudinary");
const prisma = require("../../../config/prisma");

const UploadPhoto = async (file , userId) => {
  const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: "vower/profile",
  });

  const imageURL = result.secure_url;

  await prisma.user.update({
    where: {
      user_id: userId,
    },
    data: {
      photo: imageURL,
    },
  });

  return {
    photo: imageURL,
  };
};

module.exports = UploadPhoto;
