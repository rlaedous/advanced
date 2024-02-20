import styled from "styled-components";
import React from "react";
import { Top } from "./Login";
import Avatar from "components/common/Avatar";

const Profile = () => {
  return (
    <Top>
      <ProfileWrapper>
        <ProfileManagement>프로필 관리</ProfileManagement>
        <ImageFigure>
          <Avatar size="large" />
        </ImageFigure>
        <ProfileNickname>오렌지</ProfileNickname>
        <ProfileUserId>gwg03183</ProfileUserId>
        <EditButton>수정하기</EditButton>
      </ProfileWrapper>
    </Top>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  width: 500px;
  background-color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  border-radius: 12px;
`;

const ProfileManagement = styled.h1`
  font-size: 36px;
  font-weight: 700;
`;

const ImageFigure = styled.figure`
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
`;
const Image = styled.image`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
const ProfileNickname = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
const ProfileUserId = styled.span`
  font-size: 18px;
  color: gray;
`;

const EditButton = styled.button`
  background-color: black;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: auto;
  padding: 6px 12px;
`;
