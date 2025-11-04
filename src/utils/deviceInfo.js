import UAParser from "ua-parser-js";

export const getDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    browser: result.browser.name,
    browserVersion: result.browser.version,
    os: result.os.name,
    osVersion: result.os.version,
    deviceType: result.device.type || "desktop",
    deviceVendor: result.device.vendor || "unknown",
    deviceModel: result.device.model || "unknown",
  };
};
