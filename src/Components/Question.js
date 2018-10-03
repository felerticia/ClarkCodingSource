import React from "react";
import Answers from "./Answers";
import Button from "./Button";

export default class Question extends React.Component {
  constructor() {
    super();
    this.state = { textAreaValue: "" };
  }

  onInputChange(e, v) {
    this.props.onInputChange(e, v);
  }

  onTextAreaChange(e, v) {
    this.setState({ textAreaValue: v });
  }

  onTextAreaSubmit(e, v) {
    this.props.onInputChange(e, v);
  }

  goNext() {
    this.props.goNext();
  }

  render() {
    const data = this.props.question;

    // building answers based on type and multiple values on json
    let answersType = "";
    if (data.question_type === "multiple-choice" && data.multiple === "false")
      answersType = "single";
    else if (
      data.question_type === "multiple-choice" &&
      !data.multiple === "false"
    )
      answersType = "multiple";
    else answersType = "text";

    // setting up answers component and passing in vars
    // it shall figure out wheter it needs to jump or not , and it's type wheter it's text or multiple or single
    const answers = (
      <Answers
        type={answersType}
        choices={data.choices}
        jumps={data.jumps}
        multiline={data.multiline}
        number={this.props.number}
        onInputChange={this.onInputChange.bind(this)}
        onTextAreaChange={this.onTextAreaChange.bind(this)}
        textAreaValue={this.state.textAreaValue}
        currentQuestion={this.props.currentQuestion}
      />
    );

    // setting entinty
    // will show description if any exists
    // will show sanswers
    // will show Next Button if Question type is Multiselect or is text
    const questionEntity = (
      <div
        className="question"
        style={{
          marginLeft:
            this.props.number == 0 &&
            this.props.currentQuestion * (100 * -1) + "%"
        }}
      >
        <h1>{data.headline}</h1>
        {data.description && <h3>{data.description}</h3>}
        <div class="flex">{answers}</div>
        {(data.multiple === "true" || data.multiline) && (
          <Button
            isFinal={this.props.totalQuestions === this.props.number + 1}
            goNext={this.goNext.bind(this)}
            data={this.state.textAreaValue}
            currentQuestion={this.props.number}
            onTextAreaSubmit={this.onTextAreaSubmit.bind(this)}
          />
        )}
      </div>
    );
    return questionEntity;
  }
}
