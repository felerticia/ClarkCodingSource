import React from "react";
import Question from "./Question";

export default class Questions extends React.Component {
  onInputChange(e, v) {
    this.props.onInputChange(e, v);
  }

  goNext() {
    this.props.goNext();
  }

  render() {
    return (
      <div className={this.props.start ? "questions visible" : "questions"}>
        <div className="qwrapper">
          {this.props.questions.map((questionItem, index) => (
            <Question
              currentQuestion={this.props.currentQuestion}
              onInputChange={this.onInputChange.bind(this)}
              question={questionItem}
              key={index}
              number={index}
              goNext={this.goNext.bind(this)}
              totalQuestions={this.props.questions.length}
            />
          ))}
        </div>
      </div>
    );
  }
}
