import './historyofQ.css'
import React, { useState, useEffect } from "react";
import { unparametrize } from '../questionnaire/utils';


const History = () => {

  const [sessions, setSessions] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [questionsWithAnswers, setQuestionsWithAnswers] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);

  const handleSessionButtonClick = (session) => {
    setSelectedSession(session);
    console.log(session);
    setQuestionnaires([]);
    setQuestionsWithAnswers([]);
  };

  const handleQuestionnaireButtonClick = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire);
    console.log(selectedQuestionnaire);
    setQuestionsWithAnswers([]);
  };

  useEffect(() => {
    const fetchSessions = async () => {
      let url = `${process.env.REACT_APP_API_SERVER_URL}/session?onlyIds=false`;
      console.log(`GET  ${url}`);
      const response = await fetch(url);
      const json = await response.json();
      setSessions(json);
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      if (selectedSession) {
        Promise.all(
          selectedSession.questionnaires.map(async (q) => {
            try {
              let url = `${process.env.REACT_APP_API_SERVER_URL}/questionnaire/${q.questionnaireId}?onlyIds=true`;
              console.log(`GET ${url}`);
              const response = await fetch(url);
              return response.json();
            } catch (error) {
              console.error(`Error fetching questionnaires for session ${selectedSession._id}`, error);
            }
          })
        )
          .then(qs => {
            setQuestionnaires(qs);
          });
      }
    };
    fetchQuestionnaires();
  }, [selectedSession]);

  useEffect(() => {
    const fetchQuestionsWithAnswers = async () => {
      if (selectedSession && selectedQuestionnaire) {
        let questionnaireId = selectedQuestionnaire.questionnaireId;
        Promise.all(
          selectedQuestionnaire.questions.map(async (question) => {
            try {
              let url = `${process.env.REACT_APP_API_SERVER_URL}/question/${questionnaireId}/${question}`;
              console.log(`GET ${url}`);
              const response = await fetch(url);
              return response.json();
            } catch (error) {
              console.error(`Error fetching questionnaires for session ${selectedSession._id}`, error);
            }
          })
        ).then(qs => {
          let questions = unparametrize(qs);
          let qAndAs = [];
          selectedSession.questionnaires
          .find(s => s.questionnaireId === questionnaireId)
          .answers.forEach(ans => {
            let question = questions.find(q => q._id === ans.questionId);
              let optionText = question.options.find(o => o._id === ans.optionId).optionText;
              qAndAs.push({
                question: question.questionText,
                answer: optionText
              });
            });
          setQuestionsWithAnswers(qAndAs);
        });
      }
    };
    fetchQuestionsWithAnswers();
  }, [selectedSession, selectedQuestionnaire]);


  if (sessions.length !== 0) {
    return (
      <>
        <h2>History</h2>
        <div className="main_component">
          <div className="sessions_section section">
            <div className="header">
              <h2>Sessions</h2>
            </div>
            <Sessions sessions={sessions} onSessionClick={handleSessionButtonClick} />
          </div>
          <div className="questionnaires_section section">
            <div className="header">
              <h2>Questionnaires</h2>
            </div>
            {selectedSession ? (
              <>
                <Questionnaires questionnaires={questionnaires} onQuestionnaireClick={handleQuestionnaireButtonClick} />
              </>
            ) : (
              <h3>Select a Session to View Questionnaires</h3>
            )}
          </div>
          <div className="answer_section section">
            <div className="header">
              <h2>Answers</h2>
            </div>
            {selectedQuestionnaire ? (
              <>
                <QuestionsWithAnswers questionsWithAnswers={questionsWithAnswers} />
              </>
            ) : (
              <h3>Select a Session to View Questionnaires</h3>
            )}
          </div>
        </div>
      </>
    );
  }
}

const Sessions = ({ sessions, onSessionClick }) => {
  return (
    <ul className="list-group pane">
      {sessions.map(session => (
        <button key={`${session._id}`} onClick={() => onSessionClick(session)} className="list-group-item list-group-item-action">{session._id}</button>
      ))}
    </ul>
  )
}

const Questionnaires = ({ questionnaires, onQuestionnaireClick }) => {
  return (
    <ul className="list-group pane">
      {questionnaires.map((questionnaire) => (
        <button className='btn' onClick={() => onQuestionnaireClick(questionnaire)}>
          <li key={questionnaire.questionnaireId} className="QButton list-group-item d-flex justify-content-between align-items-start">
            <div className="fw-bold">{questionnaire.questionnaireTitle}</div>
            {questionnaire.keywords && questionnaire.keywords.join(', ')}
          </li>
        </button>
      ))
      }
    </ul >
  );
};


const QuestionsWithAnswers = ({ questionsWithAnswers }) => {
  return (
    <ul className="list-group pane">
      {questionsWithAnswers.length !== 0 && questionsWithAnswers.map(qAndA => (
        <li key={`${qAndA.answer}`} className="list-group-item d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">{qAndA.question}</div>
            {qAndA.answer}
          </div>
        </li>
      ))}
    </ul>
  )
}


export default History;

