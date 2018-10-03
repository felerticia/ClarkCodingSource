import React from "react";
import Answer from "./Answer";

//Answers type={answersType} choices={data.choices} jumps={data.jumps}
// type=
//single multiple text

// choices=
//label	"Ja"    value	"Ja"    selected	false

// jumps= array of jumps or empty
// conditions:	[	field	"list_12111717"     value	"Ja"        ]
// destination	:      [  id	"list_12111755" ]

export default class Answers extends React.Component {
  onInputChange(e, v) {
    this.props.onInputChange(e, v);
  }
  onTextAreaChange(e, v) {
    this.props.onTextAreaChange(e, v);
  }

  render() {
    const { type, choices, jumps, number } = this.props;
    let answer;
    const willJump = jumps.length > 0;

    if (type === "single")
      answer = choices.map((choice, index) => (
        <Answer
          onInputChange={this.onInputChange.bind(this)}
          data={choice}
          key={index}
          number={number}
          sub={index}
          willJump={jumps.length > 0 ? jumps[index].destination.id : "next"}
        />
      ));
    if (type === "multiple")
      answer = choices.map((choice, index) => (
        <Answer
          onInputChange={this.onInputChange.bind(this)}
          data={choice}
          key={index}
          number={number}
          sub={index}
          willJump={willJump}
        />
      ));
    if (type === "text")
      answer = (
        <Answer
          onTextAreaChange={this.onTextAreaChange.bind(this)}
          multiline={this.props.multiline}
          willJump={willJump}
          textAreaValue={this.props.textAreaValue}
        />
      );

    return answer;
  }
}
