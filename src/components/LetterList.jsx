import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LetterCard from "./LetterCard";
import { useEffect } from "react";
import { __getLetters } from "redux/modules/lettersSlice";

export default function LetterList() {
  const activeMember = useSelector((state) => state.member);

  // console.log("activeMember", activeMember);
  const letters = useSelector((state) => state.letters.letters);
  console.log("letters", letters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getLetters());
  }, [dispatch]);

  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember
  );
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
  return <div>ㅇㅇ</div>;
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
