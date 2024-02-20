import axios from "axios";

// axios.create의 입력값으로 들어가는 객체는 configuration 객체에요.
// https://axios-http.com/docs/req_config
// 위 주소를 참고해주세요!
const instance = axios.create({
  baseURL: "http://localhost:5000",

  // timeout: 1,
});

instance.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전 수행
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("인터셉트 요청 성공!");
    return config;
  },
  function (error) {
    // 오류 요청을 보내기 전 수행
    console.log("인터셉트 요청 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    console.log("인터셉트 응답 받았어요!");
    console.log("Response received at:", new Date().toISOString());
    // 정상 응답
    return response;
  },

  function (error) {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access:", error);
      // 예: 로그인 페이지로 리디렉트
      window.location.href = "/login";
    }

    console.log("인터셉트 응답 못받았어요...ㅠㅠ");
    return Promise.reject(error);
  }
);

export default instance;
