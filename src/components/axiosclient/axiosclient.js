import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "";

const header = {
    'Accept': 'application/vnd.github.v3+json',
}

axiosClient.defaults.headers = header;

export default axiosClient;