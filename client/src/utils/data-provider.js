/***********************
 * Author : mansouri youssef
 * TensorCode: 2023
 ************************/
import axios from "axios";
import { getCookies } from "./cookies";

// Error handling with axios interceptors
const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getCookies()}`;
    return config;
  },
  (error) => {
    const customError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

let apiUrl = "/api"; //Endpoint with reversed proxy

export const getList = async (resource) => {
  const url = `${apiUrl}/${resource}`;

  const { data } = await axiosInstance.get(url);

  return data || [];
};

export const create = async (resource, variables) => {
  const url = `${apiUrl}/${resource}`;

  const { data, status } = await axiosInstance.post(url, variables);

  return {
    data,
    status,
  };
};

export const update = async (resource, id, variables) => {
  const url = `${apiUrl}/${resource}/${id}`;

  const { data, status } = await axiosInstance.patch(url, variables);

  return {
    data,
    status,
  };
};

export const deleteOne = async (resource, id, variables) => {
  const url = `${apiUrl}/${resource}/${id}`;

  const { data } = await axiosInstance.delete(url, {
    data: variables,
  });

  return {
    data,
  };
};

export const getOne = async (resource, id) => {
  const url = `${apiUrl}/${resource}/${id}`;

  const { data, status } = await axiosInstance.get(url);

  return {
    data,
    status,
  };
};
