import { useState } from 'react';
import FeedbackOptions from 'components/FeedbackOptions/FeedbackOptions';
import Section from 'components/Section/Section';
import Statistics from 'components/Statistics/Statistics';
import Notification from 'components/Notification/Notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const leaveFeedback = name => {
    switch (name) {
      case 'good':
        setGood(pS => pS + 1);
        break;
      case 'neutral':
        setNeutral(pS => pS + 1);
        break;
      case 'bad':
        setBad(pS => pS + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const positiveFeedback = good + neutral;
    const percentage = (positiveFeedback / total) * 100;
    return Math.round(percentage);
  };

  const total = countTotalFeedback();
  const positivePercentage =
    total === 0 ? 0 : countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={leaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
};

export default App;
