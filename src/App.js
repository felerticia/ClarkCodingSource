import React, { Component } from "react";
import Intro from "./Components/Intro";
import Questions from "./Components/Questions";
import Footer from "./Components/Footer";
import Preloader from "./Components/Preloader";

class App extends Component {
  constructor() {
    super();
    this.state = {
      getData: false,
      start: false,
      questionnaireName: "",
      questionnaireDescription: "",
      currentQuestion: 0,
      questions: [],
      questionsIDs: [],
      answers: []
    };
  }

  onInputChange(e, v) {
    //getting the answer ID and value (whtere a radio button or text)
    let answers = this.state.answers;
    let answerId = Number.isInteger(e) ? e : e.split("-")[2];
    answers[this.state.currentQuestion] = v;

    //setting up next question
    //whtere the current answer shall redirect the user
    //to a new question away from the default 'next question'
    //or we shall continue with the next question
    let nextQuestion =
      this.state.questions[this.state.currentQuestion].jumps.length > 0
        ? this.state.questionsIDs.indexOf(
            this.state.questions[this.state.currentQuestion].jumps[answerId]
              .destination.id
          )
        : this.state.currentQuestion + 1;

    // wait for css animation on current answer to be finalized before moving to next question
    setTimeout(() => {
      this.setState({
        answers,
        currentQuestion: nextQuestion
      });
    }, 700);
  }

  // handling go to previous question
  goPrev() {
    if (this.state.currentQuestion > 0)
      this.setState({
        currentQuestion: this.state.currentQuestion - 1
      });
  }

  // handling go to next question
  goNext() {
    if (this.state.currentQuestion < this.state.questions.length - 1)
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      });
  }

  // handling the start button
  handleStart() {
    this.setState({
      start: true
    });
  }

  componentDidMount() {
    //Fetching from a JSON store site
    fetch("https://api.myjson.com/bins/108znk")
      //convert to JSON if needed
      .then(res => res.json())
      .then(res => {
        // set state to render the the app when data is received
        // getData : remove preloading
        // questionnaireName: Name of the questionnaire,
        // questionnaireDescription: Description of the questionnaire,
        // questions: setting up questions array to deliver to components,
        // questionsIDs: setting up questions-IDs only array, to handle jumping to various questions easier,
        // answers: receiving and storing answerwes
        this.setState({
          getData: true,
          questionnaireName: res.questionnaire.name,
          questionnaireDescription: res.questionnaire.description,
          questions: res.questionnaire.questions,
          questionsIDs: res.questionnaire.questions.map(q => q.identifier),
          answers: res.questionnaire.questions.map(q => "")
        });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <Preloader getData={this.state.getData} />
        <Intro
          start={this.state.start}
          handleStart={this.handleStart.bind(this)}
          name={this.state.questionnaireName}
          description={this.state.questionnaireDescription}
        />
        <Questions
          currentQuestion={this.state.currentQuestion}
          start={this.state.start}
          questions={this.state.questions}
          onInputChange={this.onInputChange.bind(this)}
          goNext={this.goNext.bind(this)}
        />
        <Footer
          start={this.state.start}
          goPrev={this.goPrev.bind(this)}
          goNext={this.goNext.bind(this)}
          completedQuestions={this.state.answers.filter(x => x !== "").length}
          totalQuestion={this.state.questions.length}
        />
      </div>
    );
  }
}

export default App;
