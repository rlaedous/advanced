import { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Button from "./common/Button";
import { useDispatch, useSelector } from "react-redux";
import { __addLetters } from "redux/modules/lettersSlice";

export default function AddForm() {
  const isLogin = useSelector((state) => state.auth.nickname);
  const storeUserId = useSelector((state) => state.auth.userId);
  const userAvatar = useSelector((state) => state.auth.avatar);

  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [member, setMember] = useState("카리나");

  const onAddLetter = (event) => {
    event.preventDefault();
    if (!content) return alert("내용은 필수값입니다.");

    const newLetter = {
      createdAt: new Date(),
      nickname: isLogin,
      avatar: userAvatar,
      content,
      writedTo: member,
      id: uuid(),
      userId: storeUserId,
    };
    dispatch(__addLetters(newLetter));
    setContent("");
  };

  return (
    <Form onSubmit={onAddLetter}>
      <InputWrapper>
        <label>닉네임:</label>
        <span style={{ width: "100%", color: "white" }}>{isLogin}</span>
      </InputWrapper>
      <InputWrapper>
        <label>내용:</label>
        <textarea
          placeholder="최대 100글자까지 작성할 수 있습니다."
          maxLength={100}
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
      </InputWrapper>
      <SelectWrapper>
        <label>누구에게 보내실 건가요?</label>
        <select onChange={(event) => setMember(event.target.value)}>
          <option>카리나</option>
          <option>윈터</option>
          <option>닝닝</option>
          <option>지젤</option>
        </select>
      </SelectWrapper>
      <Button text="팬레터 등록" />
    </Form>
  );
}

const Form = styled.form`
  background-color: gray;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 500px;
  border-radius: 12px;
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & label {
    width: 80px;
  }
  & input,
  textarea {
    width: 100%;
    padding: 12px;
  }
  & textarea {
    resize: none;
    height: 80px;
  }
`;

const SelectWrapper = styled(InputWrapper)`
  justify-content: flex-start;
  & label {
    width: 170px;
  }
`;
