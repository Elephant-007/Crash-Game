import axios from "axios";
import environment from ".";
axios.defaults.baseURL = environment.server;
export default axios;
