import axios from "axios";

const letterClient = axios.create({
  baseURL: "http://localhost:5000/letters",
});

letterClient.interceptors.request.use(
  async function (config) {
    // 요청을 보내기 전 수행
    const accessToken = localStorage.getItem("accessToken");
    // //console.log("accessToken", accessToken);
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // //console.log("response.data", response.data);
    if (!response.data.success) {
      localStorage.removeItem("accessToken");
      //console.log("토큰만료");
      alert("토큰만료");
      return Promise.reject();
    }

    // //console.log("config", config);
    return config;
  },
  function (error) {
    // 오류 요청을 보내기 전 수행
    //console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);

export default letterClient;
