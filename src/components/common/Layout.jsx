import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { __logOut } from "redux/modules/authSlice";
import styled from "styled-components";

export default function Layout() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 컴포넌트가 렌더링될 때 로그인 상태를 확인하고, 로그인되어 있지 않다면 로그인 페이지로 이동
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  return (
    <>
      <Nav>
        <Link to="/">
          <div>HOME</div>
        </Link>
        <section>
          <Link to="/profile">
            <div>내 프로필</div>
          </Link>

          <div onClick={() => dispatch(__logOut())}>로그아웃</div>
        </section>
      </Nav>
      <Outlet />
    </>
  );
}

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background-color: gray;
  padding: 12px 24px;
  & div {
    cursor: pointer;
    &:hover {
      color: yellow;
      font-weight: 700;
    }
  }
  & section {
    display: flex;
    gap: 12px;
  }
`;
