// src/utils/cookie-utils.js
const ACCESS_TOKEN = "ACCESS_TOKEN";

export const getCookie = (name) => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const setAccessToken = (accessToken) => {
  // ตั้งค่า Cookie ให้ JavaScript อ่านได้
  document.cookie = `${ACCESS_TOKEN}=${accessToken}; path=/; max-age=604800; SameSite=Lax;`;
};

export const removeAccessToken = () => {
  document.cookie = `${ACCESS_TOKEN}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
