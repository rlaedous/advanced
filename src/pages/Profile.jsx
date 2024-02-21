import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Top } from "./Login";
import Avatar from "components/common/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { __editProfile } from "redux/modules/authSlice";

const Profile = () => {
  const { avatar, userId, nickname } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editNickname, setEditNickname] = useState(nickname);

  const nickChangeHandler = (e) => {
    setEditNickname(e.target.value);
  };

  const handleEdit = () => {
    const formData = new FormData();
    if (editNickname) {
      formData.append("nickname", editNickname);
    }
    dispatch(__editProfile(formData));
    setIsEdit(false);
  };

  return (
    <Top>
      <ProfileWrapper>
        <ProfileManagement>프로필 관리</ProfileManagement>
        <ImageFigure>
          <Avatar size="large" src={avatar} />
        </ImageFigure>

        {isEdit ? (
          <>
            <input defaultValue={editNickname} onChange={nickChangeHandler} />
            <ProfileUserId>{userId}</ProfileUserId>
            <EditWrap>
              <EditButton onClick={() => setIsEdit(false)}>취소</EditButton>
              <EditButton onClick={handleEdit}>수정</EditButton>
            </EditWrap>
          </>
        ) : (
          <>
            <ProfileNickname>{nickname}</ProfileNickname>
            <ProfileUserId>{userId}</ProfileUserId>
            <EditButton onClick={() => setIsEdit(true)}>수정하기</EditButton>
          </>
        )}
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

const EditWrap = styled.div`
  display: flex;
  gap: 12px;
`;
export const Input = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
export const FileBox = styled.div`
  display: inline-block;
  padding: 0.5em 0.75em;
  color: #000;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: 0.25em;
`;
