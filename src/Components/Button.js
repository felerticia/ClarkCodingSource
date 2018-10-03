import React from "react";

export default class Button extends React.Component {
  goNext() {
    if (!this.props.isFinal) {
      this.props.onTextAreaSubmit(this.props.currentQuestion, this.props.data);
      this.props.goNext();
    }
  }

  render() {
    return (
      <div className="buttonWrapper">
        <button onClick={this.goNext.bind(this)} className="mainBtn">
          {this.props.isFinal ? "Done!" : "Next"}
        </button>
      </div>
    );
  }
}
