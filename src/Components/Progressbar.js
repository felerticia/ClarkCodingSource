import React from "react";

export default class Progressbar extends React.Component {
  render() {
    return (
      <div className="progress">
        <div className="progressWrapper">
          <div
            className="progressSlide"
            style={{
              width: this.props.percent + "%"
            }}
          />
        </div>
      </div>
    );
  }
}
