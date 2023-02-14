import React, { useState, useEffect } from 'react';

const Results = ({ match }) => {
  var questionnaireId = match.params.questionnaireId;
  var sessionId = match.params.sessionId;
  const [results, setResults] = useState({});


  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(process.env.REACT_APP_API_SERVER_URL + `/getsessionanswers/${questionnaireId}/${sessionId}`);
      setResults(response.data);
    };
    fetchResults();
  }, [questionnaireId, sessionId]);

  return (
    <div>
      <h2>Results for Session {sessionId}</h2>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default Results;
