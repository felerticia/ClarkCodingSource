import React from "react";

export default class FooterButton extends React.Component {
  goPrev() {
    this.props.goPrev();
  }
  goNext() {
    this.props.goNext();
  }

  render() {
    return (
      <div className="buttonWrapper">
        {this.props.goPrev ? (
          <button onClick={this.goPrev.bind(this)} className="mainBtn">
            {"<"}
          </button>
        ) : (
          <button onClick={this.goNext.bind(this)} className="mainBtn">
            {">"}
          </button>
        )}
      </div>
    );
  }
}
