import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../style/Quiz.module.css"; // Changed to .module.css
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const questions = [
  {
    section: "Basic Eligibility Check",
    fields: [
      { id: 1, text: "Have you been advised by a doctor to take this test?" },
      { id: 2, text: "Are you experiencing any symptoms related to this test?" },
      { id: 3, text: "Have you taken a similar test in the past 3 months?" },
      { id: 4, text: "Do you have any pre-existing medical conditions?" },
      { id: 5, text: "Are you on any medication that may interfere with the test results?" },
    ],
  },
  {
    section: "Lifestyle & Exposure Assessment",
    fields: [
      { id: 6, text: "Have you consumed alcohol or caffeine in the last 12 hours?" },
      { id: 7, text: "Have you been exposed to strong pollutants or chemicals?" },
      { id: 8, text: "Do you smoke or use tobacco products regularly?" },
      { id: 9, text: "Have you had a respiratory infection in the last week?" },
      { id: 10, text: "Have you been fasting for at least 8 hours (if required)?" },
    ],
  },
  {
    section: "Final Readiness Check",
    fields: [
      { id: 11, text: "Are you comfortable taking this test right now?" },
      { id: 12, text: "Do you have access to a clean, stable environment for testing?" },
      { id: 13, text: "Have you read and understood the test instructions?" },
      { id: 14, text: "Are you aware of the next steps after receiving the test result?" },
      { id: 15, text: "Do you give your consent to proceed with the test?" },
    ],
  },
];

const Quiz = () => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  const handleAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const nextSection = () => {
    if (sectionIndex < questions.length - 1) {
      setSectionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const decideTestEligibility = () => {
    const criticalAnswers = [1, 4, 6, 9, 12, 15].some((id) => answers[id] === "No");
    return criticalAnswers ? "You should consult a doctor before taking the test." : "You can proceed with the test.";
  };

  const back = () => {
    navigate("/");
  };

  useEffect(() => {
    if (showResult) {
      const resultMessage = decideTestEligibility();
      if (resultMessage === "You can proceed with the test.") {
        setTimeout(() => {
          window.location.href = "http://127.0.0.1:5000/"; // Redirect to Flask app
        }, 2000);
      } else {
        setTimeout(() => {
          setShowResult(false);
          setSectionIndex(0);
          setAnswers({});
        }, 2000);
      }
    }
  }, [showResult]);

  return (
    <div className={styles.main}>
      <div className={styles.page}>
        <div className={styles.pageContainer}>
          <div className={styles.stepIndicator}>
            {questions.map((_, index) => (
              <div
                key={index}
                className={`${styles.step} ${index <= sectionIndex ? styles.active : ""} ${index < sectionIndex ? styles.completed : ""}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className={styles.formContainer}>
            {!showResult ? (
              questions[sectionIndex] && (
                <motion.div className={styles.card} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <h2>{questions[sectionIndex].section}</h2>
                  {questions[sectionIndex].fields.map(({ id, text }, questionIndex) => (
                    <div key={id} className={styles.question}>
                      <p>{`${questionIndex + 1}. ${text}`}</p>
                      <div className={styles.options}>
                        <button onClick={() => handleAnswer(id, "Yes")} className={answers[id] === "Yes" ? styles.selected : ""}>Yes</button>
                        <button onClick={() => handleAnswer(id, "No")} className={answers[id] === "No" ? styles.selected : ""}>No</button>
                      </div>
                    </div>
                  ))}
                 <div className={styles.buttonContainer}>
                    <button className={styles.nextButton} onClick={nextSection}>Next</button>
                    <button className={styles.backButton} onClick={back}>Back</button>
                  </div>
                </motion.div>
              )
            ) : (
              <motion.div className={styles.result} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h2>Test Eligibility Result</h2>
                <p>{decideTestEligibility()}</p>
                <button className={styles.restartButton} onClick={() => { setShowResult(false); setSectionIndex(0); setAnswers({}); }}>Restart</button>
                
              </motion.div>
            )}
            </div>
    </div>
    </div>
    </div>
  );
}
export default Quiz