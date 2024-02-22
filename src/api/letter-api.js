import axios from "axios";

const letterClient = axios.create({
  baseURL: "http://localhost:5000/letters",
});

letterClient.interceptors.request.use(
  async function (config) {
    // 요청을 보내기 전 수행
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.data.success) {
      localStorage.removeItem("accessToken");
      alert("토큰만료");
      return Promise.reject();
    }
    return config;
  },
  function (error) {
    // 오류 요청을 보내기 전 수행
    return Promise.reject(error);
  }
);

export default letterClient;
