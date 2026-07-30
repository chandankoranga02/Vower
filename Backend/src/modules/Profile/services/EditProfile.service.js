const prisma = require("../../../config/prisma");

const EditProfile = async (userId, bodyData) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};

  if (bodyData.fullName !== undefined)
    updateData.fullName = bodyData.fullName;

  if (bodyData.phone !== undefined)
    updateData.phone = bodyData.phone;

  if (bodyData.photo !== undefined)
    updateData.photo = bodyData.photo;

  if (bodyData.dob !== undefined)
    updateData.dob = bodyData.dob;

  const data = await prisma.user.update({
    where: {
      user_id: userId,
    },
    data: updateData,
    select: {
      fullName: true,
      email: true,
      user_id: true,
      photo: true,
      phone: true,
      dob: true,
    },
  });

  return {
    data,
    msg: "Profile updated successfully.",
    code: 200,
  };
};

module.exports = EditProfile;