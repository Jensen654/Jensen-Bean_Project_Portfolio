const BASE_URL = "http://localhost:3001";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

const getProjects = () => {
  return fetch(`${BASE_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponse(res));
};

const confirmUser = (token) => {
  return fetch(`${BASE_URL}/users/confirm`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => handleResponse(res));
};

const loginUser = ({ email, password }) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => handleResponse(res));
};

const signUpUser = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => handleResponse(res));
};

const editUser = ({ name, email, profession, resume, about }, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email, profession, resumeUrl: resume, about }),
  }).then((res) => handleResponse(res));
};

const getUploadUrl = () => {
  return fetch(`${BASE_URL}/users/upload-url`, {
    method: "GET",
  }).then((res) => handleResponse(res));
};

const uploadPhoto = (file, uploadUrl) => {
  return fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  }).then((res) => handleResponse(res));
};

export {
  getProjects,
  confirmUser,
  loginUser,
  signUpUser,
  editUser,
  getUploadUrl,
  uploadPhoto,
};
