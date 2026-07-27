const { UAParser } = require("ua-parser-js");

const getDeviceInfo = (req) => {
    const userAgent = req.headers["user-agent"] || "";
    const parser = new UAParser(userAgent);

    const result = parser.getResult();

    // IP Address
    const forwarded = req.headers["x-forwarded-for"];

    const ipAddress = forwarded
        ? forwarded.split(",")[0].trim()
        : req.socket.remoteAddress;

    // Operating System
    const operatingSystem = [
        result.os.name,
        result.os.version
    ]
        .filter(Boolean)
        .join(" ");

    // Browser
    const browser = [
        result.browser.name,
        result.browser.version
    ]
        .filter(Boolean)
        .join(" ");

    // Device type
    const deviceType =
        result.device.type || "desktop";

    // Device model/name when detectable
    const deviceName = [
        result.device.vendor,
        result.device.model
    ]
        .filter(Boolean)
        .join(" ");

    return {
        ipAddress,
        operatingSystem,
        deviceType,
        deviceName: deviceName || null,
        browser
    };
};

module.exports = {
    getDeviceInfo
};