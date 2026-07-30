const getProfileService = require("./services/getProfile.service")
const EditProfileService = require("./services/EditProfile.service")
const uploadService = require("./services/UploadPhoto.service");


const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await getProfileService.getProfile(userId);

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully.",
            data: result,
            
        });

    } catch (error) {
        console.error(error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const bodyData = req.body;
        const result = await EditProfileService.EditProfile(userId, bodyData);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: result,
        });

    } catch (error) {
        console.error(error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};



const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const result = await uploadService.uploadPhoto(req.file);

    return res.status(200).json({
      success: true,
      message: "Photo uploaded successfully",
      data: result,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

module.exports = {
    getProfile,
    updateProfile,
    uploadProfilePhoto
};