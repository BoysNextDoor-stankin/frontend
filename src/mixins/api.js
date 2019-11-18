const APIURL = "http://localhost:3002/api";
const axios = require("axios");
export const requestsMixin = {
    methods: {
        getImage(id) {
            return axios.get(`${APIURL}/images/${id}`);
        },
        getImages() {
            return axios.get(`${APIURL}/images`);
        },
        addImage(data) {
            return axios.post(`${APIURL}/images`, data);
        },
        editImage(data) {
            return axios.put(`${APIURL}/images/${data.id}`, data);
        },
        deleteImage(id) {
            return axios.delete(`${APIURL}/images/${id}`);
        }
    }
};
