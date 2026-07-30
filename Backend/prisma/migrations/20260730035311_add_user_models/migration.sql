/*
  Warnings:

  - The primary key for the `signup_data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id]` on the table `signup_data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'SCOOTER', 'BIKE', 'BUS', 'TRUCK');

-- CreateEnum
CREATE TYPE "ConnectorType" AS ENUM ('CCS1', 'CCS2', 'TYPE1', 'TYPE2', 'CHADEMO', 'GB_T', 'NACS');

-- CreateEnum
CREATE TYPE "StationType" AS ENUM ('PUBLIC', 'PRIVATE', 'CORPORATE');

-- CreateEnum
CREATE TYPE "StationStatus" AS ENUM ('ACTIVE', 'MAINTENANCE', 'CLOSED');

-- CreateEnum
CREATE TYPE "PortStatus" AS ENUM ('AVAILABLE', 'CHARGING', 'RESERVED', 'OFFLINE');

-- AlterTable
ALTER TABLE "signup_data" DROP CONSTRAINT "signup_data_pkey",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "signup_data_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "signup_data_user_id_seq";

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "fullName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20),
    "photo" VARCHAR(500),
    "provider" "AuthProvider" NOT NULL,
    "google_id" TEXT,
    "dob" TIMESTAMP(3),
    "gender" "Gender",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "address" TEXT,
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "pincode" VARCHAR(10),
    "language" VARCHAR(30) DEFAULT 'English',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_auth" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "loginCount" INTEGER NOT NULL DEFAULT 0,
    "lastActivity" TIMESTAMP(3),
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "accountLockedUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_devices" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "deviceType" VARCHAR(50),
    "deviceName" VARCHAR(100),
    "operatingSystem" VARCHAR(100),
    "appVersion" VARCHAR(20),
    "ipAddress" VARCHAR(50),
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "balance" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "rewardPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "vehicleType" "VehicleType" NOT NULL,
    "manufacturer" VARCHAR(50) NOT NULL,
    "vehicleModel" VARCHAR(50) NOT NULL,
    "registrationNumber" VARCHAR(20) NOT NULL,
    "batteryCapacityKwh" DECIMAL(5,2),
    "connectorType" "ConnectorType" NOT NULL,
    "vinNumber" VARCHAR(50),
    "fastChargingSupported" BOOLEAN NOT NULL DEFAULT false,
    "maximumChargingPowerKw" DECIMAL(5,2),
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stations" (
    "id" BIGSERIAL NOT NULL,
    "stationId" TEXT NOT NULL,
    "stationName" VARCHAR(150) NOT NULL,
    "ownerId" BIGINT,
    "stationType" "StationType" NOT NULL,
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "address" TEXT NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "pincode" VARCHAR(10),
    "latitude" DECIMAL(10,8) NOT NULL,
    "longitude" DECIMAL(11,8) NOT NULL,
    "googlePlaceId" VARCHAR(255),
    "averageRating" DECIMAL(2,1) DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "openingTime" TIMESTAMP(3),
    "closingTime" TIMESTAMP(3),
    "is24x7" BOOLEAN NOT NULL DEFAULT false,
    "status" "StationStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charging_ports" (
    "id" BIGSERIAL NOT NULL,
    "stationId" BIGINT NOT NULL,
    "portNumber" INTEGER NOT NULL,
    "connectorType" "ConnectorType" NOT NULL,
    "maxPowerKw" DECIMAL(5,2) NOT NULL,
    "currentStatus" "PortStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isFastCharger" BOOLEAN NOT NULL DEFAULT false,
    "pricePerKwh" DECIMAL(8,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "charging_ports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_id_key" ON "users"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_userId_key" ON "user_auth"("userId");

-- CreateIndex
CREATE INDEX "user_devices_userId_idx" ON "user_devices"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_userId_key" ON "wallets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_registrationNumber_key" ON "vehicles"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vinNumber_key" ON "vehicles"("vinNumber");

-- CreateIndex
CREATE INDEX "vehicles_userId_idx" ON "vehicles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "stations_stationId_key" ON "stations"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "stations_googlePlaceId_key" ON "stations"("googlePlaceId");

-- CreateIndex
CREATE INDEX "stations_city_idx" ON "stations"("city");

-- CreateIndex
CREATE INDEX "stations_latitude_longitude_idx" ON "stations"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "stations_status_idx" ON "stations"("status");

-- CreateIndex
CREATE INDEX "stations_stationType_idx" ON "stations"("stationType");

-- CreateIndex
CREATE INDEX "charging_ports_stationId_idx" ON "charging_ports"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "charging_ports_stationId_portNumber_key" ON "charging_ports"("stationId", "portNumber");

-- CreateIndex
CREATE UNIQUE INDEX "signup_data_user_id_key" ON "signup_data"("user_id");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_auth" ADD CONSTRAINT "user_auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_devices" ADD CONSTRAINT "user_devices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stations" ADD CONSTRAINT "stations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charging_ports" ADD CONSTRAINT "charging_ports_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
