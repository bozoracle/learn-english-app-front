import React, { memo, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useTimerDispatch } from "context/TimerContext";
import uuid from "react-uuid";

import useData from "./Game.data";

import FirstTime from "components/gameTypes/FirstTime/FirstTime";
import LetterByLetter from "components/gameTypes/LetterByLetter/LetterByLetter";
import LettersSnake from "components/gameTypes/LettersSnake/LettersSnake";
import CompleteComposition from "components/gameTypes/CompleteComposition/CompleteComposition";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Game = (props) => {
  const dispatch = useTimerDispatch();
  const { handle } = useParams();
  const { data, error, loading } = useData(handle);

  const [currentWord, setCurrentWord] = useState(0);
  const [gameCourse, setGameCourse] = useState([]);

  const onFinish = () => {
    setCurrentWord((prevState) => prevState + 1);
  };

  useEffect(() => {
    dispatch({ type: "START_CLOCK" });
  }, []);

  useEffect(() => {
    data &&
      setGameCourse([
        {
          gameComponent: LettersSnake,
          wordItem: data.wordsByTopicId[1],
        },
        {
          gameComponent: LetterByLetter,
          wordItem: data.wordsByTopicId[2],
        },
        {
          gameComponent: FirstTime,
          wordItem: data.wordsByTopicId[3],
        },
      ]);
  }, [data]);

  return (
    <MainWrapper>
      {data &&
        gameCourse.map((gameItem, index) => {
          if (index === currentWord) {
            return (
              <CompleteComposition
                key={uuid()}
                gameComponent={gameItem.gameComponent}
                wordItem={gameItem.wordItem}
                onFinish={onFinish}
              />
            );
          } else {
            return null;
          }
        })}
    </MainWrapper>
  );
};

export default memo(Game);
