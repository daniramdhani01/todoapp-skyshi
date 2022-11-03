import axios from "axios";

export const API = axios.create({
    baseURL: "https://todo.api.devcode.gethired.id/",
});