import React from "react";
import FeedbackOptions from "./components/feedbackOptions";
import Statistics from "./components/statistics";
import Notification from "./components/notification";
import Section from "./components/section";
import Container from "components/container/";

class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  countPositiveFeedbackPercentage = () => {
    return (
      Math.round((this.state.good / this.countTotalFeedback()) * 1000) / 10
    );
  };
  clickOnButton = (event) => {
    const name = event.target.name;
    this.setState((prevState) => ({
      [name]: prevState[name] + 1,
    }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);

    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.clickOnButton}
          />
        </Section>
        <Section title="Statistics">
          {this.countTotalFeedback() > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </Container>
    );
  }
}

export default App;
