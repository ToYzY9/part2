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

const remove = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((res) => {
        console.log("User deleted successfully:", res.data);
    });
};

const edit = async (id) => {
    const request = axios.put(`${baseUrl}/${id}`, newData);
    return request.then((res) => res.data);
};

export default {
    getAll,
    create,
    remove,
    edit,
};
