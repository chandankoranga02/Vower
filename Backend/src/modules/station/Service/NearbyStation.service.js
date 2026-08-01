const { getDistance } = require("geolib");
const prisma = require("../../../config/prisma");

const nearby_station = async (userLat, userLng, searchRadius) => {
  const stations = await prisma.station.findMany({
    where: {
      status: "ACTIVE",
    },

    select: {
      stationId: true,
      stationName: true,
      stationType: true,
      status: true,

      address: true,
      city: true,
      state: true,

      latitude: true,
      longitude: true,

      averageRating: true,
      totalReviews: true,

      ports: {
        select: {
          connectorType: true,
          maxPowerKw: true,
          currentStatus: true,
          isFastCharger: true,
        },
      },
    },
  });

  const stationsWithDistance = stations.map((station) => {
    const distance = getDistance(
      {
        latitude: userLat,
        longitude: userLng,
      },
      {
        latitude: station.latitude,
        longitude: station.longitude,
      },
    );

    return {
      ...station,
      distanceInMeters: distance,
      distanceInKm: Number((distance / 1000).toFixed(2)),
    };
  });

  // Filter stations within radius
  const nearbyStations = stationsWithDistance.filter(
    (station) => station.distanceInKm <= searchRadius,
  );

  // Sort by nearest distance
  nearbyStations.sort((a, b) => a.distanceInMeters - b.distanceInMeters);

  return nearbyStations;
};

module.exports = nearby_station;
