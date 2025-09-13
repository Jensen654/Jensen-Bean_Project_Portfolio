const BASE_URL = "http://localhost:3001";

const handleResponse = async (res) => {
  // console.log(res);

  if (res.ok) {
    const text = await res.text();
    return text ? JSON.parse(text) : null; // or null, depending on your use case
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

const editUser = (
  { name, avatar, email, profession, resume, about },
  token
) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
      email,
      profession,
      resumeUrl: resume,
      about,
    }),
  }).then((res) => handleResponse(res));
};

const getUploadUrl = () => {
  return fetch(`${BASE_URL}/users/upload-url`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => handleResponse(res));
};

const getDeleteUrl = (url) => {
  return fetch(`${BASE_URL}/users/delete-url/${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
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

const deletePhoto = (deleteUrl) => {
  return fetch(deleteUrl, {
    method: "DELETE",
  }).then((res) => handleResponse(res));
};

const updateUserInfo = (
  { name, avatar, email, profession, resume, about },
  token
) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
      email,
      profession,
      resumeUrl: resume,
      about,
    }),
  }).then((res) => handleResponse(res));
};

const addProject = (
  { type, title, description, url, videoUrl, image },
  token
) => {
  return fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ type, title, description, url, videoUrl, image }),
  }).then((res) => handleResponse(res));
};

const deleteProject = ({ token, projectId }) => {
  return fetch(`${BASE_URL}/projects`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ projectId }),
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
  updateUserInfo,
  getDeleteUrl,
  deletePhoto,
  addProject,
  deleteProject,
};
