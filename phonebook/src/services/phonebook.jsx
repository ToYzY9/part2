import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
    const request = axios.get(baseUrl);
    return request.then((res) => res.data);
};

const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((res) => res.data);
};

export default {
    getAll,
    create,
};
