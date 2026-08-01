const prisma = require("../../../config/prisma");

const getStationService = async (stationId) => {
  if (!stationId) {
    const error = new Error("Station ID is required");
    error.statusCode = 400;
    throw error;
  }

  const station = await prisma.station.findUnique({
    where: {
      stationId,
    },
    include: {
      owner: {
        select: {
          user_id: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
      ports: {
        orderBy: {
          portNumber: "asc",
        },
        select: {
          portNumber: true,
          connectorType: true,
          maxPowerKw: true,
          currentStatus: true,
          isFastCharger: true,
          pricePerKwh: true,
        },
      },
    },
  });

  if (!station) {
    const error = new Error("Station not found");
    error.statusCode = 404;
    throw error;
  }

  const statistics = {
    totalPorts: station.ports.length,
    availablePorts: station.ports.filter(
      (port) => port.currentStatus === "AVAILABLE",
    ).length,
    chargingPorts: station.ports.filter(
      (port) => port.currentStatus === "CHARGING",
    ).length,
    reservedPorts: station.ports.filter(
      (port) => port.currentStatus === "RESERVED",
    ).length,
    offlinePorts: station.ports.filter(
      (port) => port.currentStatus === "OFFLINE",
    ).length,

    fastChargers: station.ports.filter((port) => port.isFastCharger).length,
    slowChargers: station.ports.filter((port) => !port.isFastCharger).length,
  };

  return {
    stationId: station.stationId,
    stationName: station.stationName,
    stationType: station.stationType,

    status: station.status,

    contact: {
      phone: station.phone,
      email: station.email,
    },

    location: {
      address: station.address,
      city: station.city,
      state: station.state,
      country: station.country,
      pincode: station.pincode,
      latitude: station.latitude,
      longitude: station.longitude,
      googlePlaceId: station.googlePlaceId,
    },

    timings: {
      is24x7: station.is24x7,
      openingTime: station.openingTime,
      closingTime: station.closingTime,
    },

    rating: {
      averageRating: station.averageRating,
      totalReviews: station.totalReviews,
    },

    statistics,

    owner: station.owner,

    ports: station.ports,
  };
};

module.exports = getStationService;
