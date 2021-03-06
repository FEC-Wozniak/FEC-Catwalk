import React from 'react';
import Answer from './Answer';
import styled from 'styled-components';

const AnswerDiv = styled.div`
max-height: 100vh;
overflow-y: auto;
`

const AnswerList = ({ answers, increaseHelpful, reportAnswer, maxed }) => {
  answers.sort((a, b) => b.helpfulness - a.helpfulness);
  let shown = answers.slice(0, 2);
  if (maxed) {
    shown = answers;
  }
  return (
    <AnswerDiv>
      {shown.map((ans) => (
        <Answer
          ans={ans}
          increaseHelpful={increaseHelpful}
          reportAnswer={reportAnswer}
          key={ans.id}
        />
      ))}
    </AnswerDiv>

  );
};

export default AnswerList;
