// import axios from "axios";

// const instance = axios.create({
//   baseURL: "https://moneyfulpublicpolicy.co.kr/",

//   // timeout: 1,
// });

// instance.interceptors.request.use(
//   function (config) {
//     console.log(config);
//     return config;
//   },
//   function (error) {
//     // 오류 요청을 보내기 전 수행
//     console.log("인터셉트 요청 오류!");
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   function (response) {
//     console.log("인터셉트 응답 받았어요!");
//     console.log("Response received at:", new Date().toISOString());
//     // 정상 응답
//     return response;
//   },

//   function (error) {
//     if (error.response && error.response.status === 401) {
//       console.log("Unauthorized access:", error);
//       // 예: 로그인 페이지로 리디렉트
//       window.location.href = "/login";
//     }

//     console.log("인터셉트 응답 못받았어요...ㅠㅠ");
//     return Promise.reject(error);
//   }
// );

// export default instance;
