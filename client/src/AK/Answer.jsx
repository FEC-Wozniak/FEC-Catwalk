import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import dateFormatter from '../global_functions/dateFormatter';

const StyledButton = styled.button`
font-family: Arial;
margin-left: 10px;
text-decoration: underline;
background: none;
border: none;
color: grey;
&:hover {
  font-weight: bold;
  cursor: pointer;
}
`;
const AnswerDiv = styled.div`
display: flex;
justify-content: space-between;
font-family: Lucida Sans, Helvetica, Arial, sans-serif;
font-weight: normal;
`;
const AnswerButtonsDiv = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin-bottom: 35px;
color: gray;
width: 400px;

`;

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helped: false,
      reported: false,
    };
    this.increaseHelpful = this.increaseHelpful.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.renderReportButton = this.renderReportButton.bind(this);
  }

  increaseHelpful() {
    const { id } = this.props.ans;
    axios({
      url: `/answers/${id}`,
      method: 'put',
    }).then(() => {
      this.setState({ helped: true });
    });
  }

  renderHelpfulButton() {
    if (this.state.helped) {
      return (
        <>
          <StyledButton
            style={{ fontWeight: 'bold' }}
            disabled
          >Thank you for your feedback! ({this.props.ans.helpfulness + 1})
          </StyledButton>
        </>
      );
    }
    return (
      <>
        <StyledButton
          onClick={this.increaseHelpful}
        >Yes ({this.props.ans.helpfulness})
        </StyledButton>
      </>
    );
  }

  reportAnswer() {
    const { id } = this.props.ans;
    axios({
      url: `/answers/${id}/report`,
      method: 'put',
    }).then(() => {
      this.setState({ reported: true });
    });
  }

  renderReportButton() {
    if (this.state.reported) {
      return (<StyledButton disabled style={{ color: 'red' }}> Reported</StyledButton>);
    }
    return <StyledButton onClick={this.reportAnswer}> Report</StyledButton>;
  }

  render() {
    return (
      <AnswerDiv>
        <div style={{ width: '65%' }}>
          <p>
            <b>A: </b>{this.props.ans.body}
          </p>
          <p style={{ fontSize: '14px' }}>by {this.props.ans.answerer_name}, {dateFormatter(this.props.ans.date)}
          </p>
        </div>
        <AnswerButtonsDiv>
          <div style={{ fontSize: '12px' }}>Helpful?</div>
          {this.renderHelpfulButton()}
          {this.renderReportButton()}
        </AnswerButtonsDiv>
      </AnswerDiv>
    );
  }
}

export default Answer;
