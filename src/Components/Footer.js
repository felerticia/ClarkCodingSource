import React from "react";
import Progressbar from "./Progressbar";
import FooterButton from "./FooterButton";

export default class Footer extends React.Component {
  goPrev() {
    this.props.goPrev();
  }
  goNext() {
    this.props.goNext();
  }

  render() {
    const percent =
      this.props.totalQuestion != 0
        ? (100 * this.props.completedQuestions) / this.props.totalQuestion
        : 0;
    return (
      <div className={this.props.start ? "footer visible" : "footer"}>
        <FooterButton goPrev={this.goPrev.bind(this)} />
        <Progressbar percent={percent} />
        <FooterButton goNext={this.goNext.bind(this)} />
      </div>
    );
  }
}
