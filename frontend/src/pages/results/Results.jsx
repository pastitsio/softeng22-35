import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom' 

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
    <div>
      <h2>Results for Session {sessionId}</h2>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default Results;
