import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API;

export { axios };
