const prisma = require("../../../config/prisma");

const getProfile = async (userId) => {
  const data = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      fullName: true,
      email: true,
      user_id: true,
      photo: true,
      phone: true,
    },
  });

  if (!data) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    data,
    msg: "Data extracted successfully.",
    code: 200,
  };
};

module.exports = {
  getProfile,
};