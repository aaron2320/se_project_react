// auth.js

const baseUrl = `http://localhost:3001/`;
const headers = {
  "Content-Type": "application/json",
};

const request = async (endpoint, options = {}) => {
  const finalOptions = {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  };

  const res = await fetch(endpoint, finalOptions);
  return checkResponse(res);
};

const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  if (err.message) {
    throw new Error(err.message);
  }
  throw new Error(`Error: ${res.status}`);
};

export const createUser = (data) => {
  return request(`${baseUrl}signup`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const authorize = (data) => {
  return request(`${baseUrl}signin`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: JSON.stringify(data),
  });
};

export const getUserInfo = (token) => {
  return request(`${baseUrl}users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserInfo = (data, token) => {
  return request(`${baseUrl}users/me`, {
    method: "PATCH",
    headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
};
