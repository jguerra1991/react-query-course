import axios from "axios";


const ProductsApi = axios.create({
    baseURL: "http://localhost:3100",
});

export { ProductsApi };