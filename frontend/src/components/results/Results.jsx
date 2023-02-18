import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom' 
import './results.css';

const Results = () => {
  var params = useParams();
  var questionnaireId = params.questionnaireId;
  var sessionId = params.sessionId;
  const [results, setResults] = useState({});

  console.log(process.env.REACT_APP_API_SERVER_URL + `/getsessionanswers/${questionnaireId}/${sessionId}`);
  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(process.env.REACT_APP_API_SERVER_URL + `/getsessionanswers/${questionnaireId}/${sessionId}`);
      const json = await response.json();
      setResults(json);
    };
    fetchResults();
  }, [questionnaireId, sessionId]);
  
  console.log('results :>> ', results);

  return (
    <div className='container'>
      <h2>Results for Session {sessionId}</h2>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default Results;
// import React, { useState, useEffect } from 'react';
// import './testjson'
// import { useParams } from 'react-router-dom' 
// import { testjson } from './testjson';
// import './results.css'

// const Results = () => {
//   var params = useParams();
//   var questionnaireId = params.questionnaireId;
//   var sessionId = params.sessionId;

//   const [results, setResults] = useState({});

//   useEffect(() => {
//     const fetchResults = async () => {
//       const questionnaire = testjson.questionnaires.find(q => q.questionnaireId === questionnaireId);
//       const session = questionnaire.sessions.find(s => s.sessionId === sessionId);
//       setResults(session);
//     };
//     fetchResults();
//   }, [questionnaireId, sessionId]);
  
//   console.log('results :>> ', results);

//   return (
//     <div className='container'>
//       <h2>Results for Session {results.sessionId}</h2>
//       <pre>{JSON.stringify(results, null, 2)}</pre>
//     </div>
//   );
// };

// export default Results;

