import { useParams } from "react-router-dom";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = "https://jensen-bean-portfolio-project-backend.onrender.com/";

const handleResponse = async (res) => {
  if (res.ok) {
    const text = await res.text();
    return text ? JSON.parse(text) : null; // or null, depending on your use case
  } else {
    const errorText = await res.text();
    let errorMessage;
    try {
      errorMessage = errorText ? JSON.parse(errorText) : `Error: ${res.status}`;
    } catch {
      errorMessage = errorText || `Error: ${res.status}`;
    }
    return Promise.reject(errorMessage);
  }
};

// const handleResponse = (res) => {
//   if (res.ok) {
//     const repo = res.json();
//     return repo;
//   }
//   return Promise.reject(`Error: ${res.status}`);
// };

//User Stuff
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

const signUpUser = ({ name, userName, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, userName, email, password }),
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

const updateUserInfo = (
  {
    name,
    avatar,
    phoneNumber,
    showContactMe,
    email,
    profession,
    resume,
    about,
  },
  token
) => {
  console.log(phoneNumber);

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
      phoneNumber,
      showContactMe,
      profession,
      resumeUrl: resume,
      about,
    }),
  }).then((res) => handleResponse(res));
};

const deleteUserProfile = ({ token }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => handleResponse(res));
};

// Projects Stuff
const getProjects = (token) => {
  return fetch(`${BASE_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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

const updateProject = (
  { _id, type, title, description, url, videoUrl, image },
  token
) => {
  return fetch(`${BASE_URL}/projects`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      _id,
      type,
      title,
      description,
      url,
      videoUrl,
      image,
    }),
  }).then((res) => handleResponse(res));
};

//Amazon Web Service Stuff
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

const getPublicUser = ({ userName }) => {
  return fetch(`${BASE_URL}/${userName}`, {
    method: "GET",
  }).then((res) => handleResponse(res));
};

const getPublicProjects = ({ userName }) => {
  return fetch(`${BASE_URL}/${userName}/projects`, {
    method: "GET",
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
  deleteUserProfile,
  getPublicUser,
  getPublicProjects,
  updateProject,
};
