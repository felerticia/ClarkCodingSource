import React from "react";

export default class Preloader extends React.Component {
  render() {
    return (
      <div class={this.props.getData ? "preloader invisble" : "preloader"}>
        <div class="bubbles">
          <span />
          <span id="bubble2" />
          <span id="bubble3" />
        </div>
      </div>
    );
  }
}
