const NearByStationService = require("./Service/NearbyStation.service");
const getStationService = require("./Service/SpecificStation.service")

const nearby_station = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
      return res.status(400).json({
        success: false,
        message: "Latitude, longitude and radius are required.",
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const searchRadius = parseFloat(radius);

    const data = await NearByStationService(latitude, longitude, searchRadius);

    return res.status(200).json({
      success: true,
      message: "Nearby stations fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const Specific_Station = async (req, res) =>{
 try {
    const { stationId } = req.params;

    const result = await getStationService(stationId);

    return res.status(200).json({
      success: true,
      message: "Station fetched successfully",
      data: result,
    });

  } catch (error) {

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });

  }
}


module.exports = {
  nearby_station,
  Specific_Station
};
