import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __logIn, __signUp } from "redux/modules/authSlice";

function Login() {
  // 현재 로그인 상태
  const [isLogin, setIsLogin] = useState(false);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIdInputChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 로그인or회원가입 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    // 회원가입된 userData로 로그인 누르면
    if (isLogin) {
      const userData = {
        id: id,
        password: password,
      };
      dispatch(__logIn(userData));
      navigate("/");
    }
    // 회원가입 버튼을 눌러서 계정생성
    else {
      const userData = {
        id: id,
        password: password,
        nickname: nickname,
      };

      // 아래 코드 지우면 회원가입 버튼을 눌렀을 때 화면 그대로
      setIsLogin(!isLogin);

      // 회원가입 후 id/password/nickname에 입력된 값 지우기
      setId("");
      setPassword("");
      setNickname("");

      dispatch(__signUp(userData));
    }
  };

  return (
    <Top>
      <Wrapper onSubmit={handleSubmit}>
        <LogInSignUp>{isLogin ? "로그인" : "회원가입"}</LogInSignUp>
        <ID
          type="text"
          placeholder="아이디 (4~10글자)"
          minLength={4}
          maxLength={10}
          onChange={handleIdInputChange}
          value={id}
          required
        />

        <Password
          type="current-password"
          placeholder="비밀번호 (4~15글자)"
          minLength={4}
          maxLength={15}
          onChange={handlePasswordInputChange}
          value={password}
          required
        />

        {!isLogin && (
          <Nickname
            type="text"
            placeholder="닉네임 (1~10글자)"
            minLength={1}
            maxLength={10}
            onChange={handleNicknameChange}
            value={nickname}
            required
          />
        )}

        <LoginButton type="submit">
          {isLogin ? "로그인" : "회원가입"}
        </LoginButton>

        <ToggleFormButton onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin ? "회원가입하기" : "로그인하기"}
        </ToggleFormButton>
      </Wrapper>
    </Top>
  );
}

export default Login;
export const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: lightgray;
`;
export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 18px;
  border-radius: 12px;
  background-color: white;
  width: 500px;
`;

export const LogInSignUp = styled.h1`
  font-size: 36px;
  margin-bottom: 36px;
`;

export const ID = styled.input`
  margin-bottom: 24px;
  padding: 12px 0px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: initial;
  border-bottom: 1px solid gray;
  outline: none;
`;

export const Password = styled.input`
  margin-bottom: 24px;
  padding: 12px 0px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: initial;
  border-bottom: 1px solid gray;
  outline: none;
`;

export const Nickname = styled.input`
  margin-bottom: 24px;
  padding: 12px 0px;
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: initial;
  border-bottom: 1px solid gray;
  outline: none;
`;

export const LoginButton = styled.button`
  background-color: lightgray;
  color: white;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
  padding: 24px 36px;
`;

export const ToggleFormButton = styled.div`
  text-align: center;
  font-size: 16px;
  color: lightgray;
  margin-top: 24px;
  cursor: pointer;
`;
