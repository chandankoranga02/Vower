const crypto = require("crypto");

const generateCode = (prefix = "US") => {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);

  const randomId = crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase();

  return `${prefix}${month}${year}${randomId}`;
};

module.exports = generateCode;