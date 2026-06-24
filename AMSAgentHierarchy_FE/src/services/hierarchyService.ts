import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

//export const getHierarchy = async (salesCode: string) => {
export const getHierarchy = async (

    salesCode: string,

    env: string

) => {
    const response = await API.get(
        `/hierarchy/${salesCode}?env=${env}`)
    return response.data;
};