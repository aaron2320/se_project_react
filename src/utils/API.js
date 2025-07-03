// API.js

// Base configuration for API requests
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.aaron2320.mooo.com"
    : "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

// Generic request function to handle all API calls
export const request = async (endpoint, options = {}) => {
  const finalOptions = {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  };

  // Commented out for production, can be re-enabled for debugging
  // console.log("Making request to:", endpoint);
  // console.log("With options:", finalOptions);

  const res = await fetch(`${baseUrl}${endpoint}`, finalOptions);
  return checkResponse(res);
};

// Response handler to check and parse API responses
export const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }
  const err = await res.json();
  if (err.message) {
    throw new Error(err.message);
  }
  throw new Error(`Error: ${res.status}`);
};

// Fetch all clothing items
export const getItems = () => {
  return request("/items", { method: "GET" });
};

// Add a new clothing item
export const postItems = (data, token) => {
  return request("/items", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

// Delete a clothing item
export const deleteItem = (id, token) => {
  return request(`/items/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add a like to a clothing item
export const addCardLike = (id, token) => {
  return request(`/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Remove a like from a clothing item
export const removeCardLike = (id, token) => {
  return request(`/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
