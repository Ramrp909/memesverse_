import type { DeviceInfo } from "@/shared/types/device";

const DEVICE_ID_KEY = "mv_device_id";

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return (
    "mv-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).substring(2)
  );
}

function getDeviceId() {
  if (typeof window === "undefined") {
    return "server";
  }

  let id = localStorage.getItem(DEVICE_ID_KEY);

  if (!id) {
    id = generateId();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }

  return id;
}

function getPlatform() {
  if (typeof navigator === "undefined") {
    return "Server";
  }

  const ua = navigator.userAgent;

  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";

  return "Web";
}

function getBrowser() {
  const ua = navigator.userAgent;

  if (/Edg/i.test(ua)) return "Edge";
  if (/Chrome/i.test(ua)) return "Chrome";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Safari/i.test(ua)) return "Safari";

  return "Browser";
}

function getDeviceName() {
  return `${getBrowser()} on ${getPlatform()}`;
}

export const DeviceService = {
  getDevice(): DeviceInfo {
    return {
      device_id: getDeviceId(),
      device_name: getDeviceName(),
      platform: getPlatform(),
    };
  },
};