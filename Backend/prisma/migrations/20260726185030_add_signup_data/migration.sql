-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE', 'PHONE');

-- CreateTable
CREATE TABLE "signup_data" (
    "user_id" SERIAL NOT NULL,
    "full_name" TEXT,
    "provider" "AuthProvider" NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password_hash" TEXT,
    "google_id" TEXT,
    "temporary_otp" TEXT,
    "otp_expires_at" TIMESTAMP(3),
    "ip_address" TEXT,
    "operating_system" TEXT,
    "device_type" TEXT,
    "device_name" TEXT,
    "browser" TEXT,
    "profile_completion" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "signup_data_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "signup_data_email_key" ON "signup_data"("email");

-- CreateIndex
CREATE UNIQUE INDEX "signup_data_phone_key" ON "signup_data"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "signup_data_google_id_key" ON "signup_data"("google_id");
