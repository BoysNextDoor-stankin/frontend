const API_URL = process.env.VUE_APP_API_URL || "http://localhost:3002/api";
const axios = require("axios");
export const requestsMixin = {
    methods: {
        getImage(id) {
            return axios.get(`${API_URL}/images/${id}`);
        },
        getImages() {
            return axios.get(`${API_URL}/images`);
        },
        addImage(data) {
            return axios.post(`${API_URL}/images`, data);
        },
        editImage(data) {
            return axios.put(`${API_URL}/images/${data.id}`, data);
        },
        deleteImage(id) {
            return axios.delete(`${API_URL}/images/${id}`);
        }
    }
};
