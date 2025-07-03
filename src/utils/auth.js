// auth.js
import { request, checkResponse } from "./API";

export const createUser = (data) => {
  return request("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const authorize = (data) => {
  return request("/signin", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: JSON.stringify(data),
  });
};

export const getUserInfo = (token) => {
  return request("/users/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserInfo = (data, token) => {
  return request("/users/me", {
    method: "PATCH",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
};
