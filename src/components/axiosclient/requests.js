import axiosClient  from "./axiosclient";
import 'regenerator-runtime/runtime';

export const getRequest = async (URL) => {
    return axiosClient.get(`${URL}`).then(response => response);
}

export const postRequest = async (URL, payload) => {
    return axiosClient.post(`${URL}`, payload).then(response => response);
}

export const putRequest = async (URL, payload) => {
    return axiosClient.put(`${URL}`, payload).then(response => response);
}

export const deleteRequest = async (URL) => {
    return axiosClient.delete(`${URL}`).then(response => response);
}