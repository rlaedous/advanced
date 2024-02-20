import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LetterCard from "./LetterCard";
import { useEffect } from "react";
import { __getLetters } from "redux/modules/lettersSlice";

export default function LetterList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getLetters());
  }, [dispatch]);
  const { isLoading, error, letters } = useSelector((state) => state.letters);
  // const letters = useSelector((state) => state.letters.letters);

  // console.log("letters", letters);
  const activeMember = useSelector((state) => state.member);

  // console.log("activeMember", activeMember);
  // const aa = useSelector((state) => state);
  // console.log("aa", aa);
  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember
  );
  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ListWrapper>
      {filteredLetters.length === 0 ? (
        <p>
          {activeMember}에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이
          되보세요!
        </p>
      ) : (
        filteredLetters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  background-color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  border-radius: 12px;
  padding: 12px;
  color: white;
`;
