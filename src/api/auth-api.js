import axios from "axios";

const authServer = axios.create({
  baseURL: `${process.env.REACT_APP_API_KEY}`,
});

export default authServer;
