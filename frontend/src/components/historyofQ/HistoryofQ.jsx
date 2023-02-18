import './historyofQ.css'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const History = () => {

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = `${process.env.REACT_APP_API_SERVER_URL}/session?onlyIds=false`;
      console.log(`GET  ${url}`);
      const response = await fetch(url);
      const json = await response.json();
      setSessions(json);
    };
    fetchData();
  }, []);

  if (sessions) {
    return (
      <>
        <h2>History</h2>
        <div className="history_table">
          <table className="table-light">
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Questionnaire Id</th>
                <th>Results</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                session.questionnaires.map(questionnaire => (
                  <>
                    <tr key={session._id}></tr>
                    <td>{session._id}</td>
                    <td>{questionnaire.questionnaireId}</td>
                    <td>
                      <button className='btn btn-primary'><Link to={`/sessionAnswers/${questionnaire.questionnaireId}/${session._id}`}>Results</Link></button>
                    </td>
                  </>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return <h2>No sessions found!</h2>
  }
};

export default History;

// import React from "react";
// import { Link } from 'react-router-dom';
// import { testjson } from './testjson';
// import './historyofQ.css'

// const History = () => {
//   return (
//     <div className='container'>
//       <h2>History</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Session ID</th>
//             <th>Questionnaire Id</th>
//             <th>Results</th>
//           </tr>
//         </thead>
//         <tbody>
//           {testjson.map(session => (
//             <>
//               <tr key={session.sessionId}>
//                 <td>{session.sessionId}</td>
//                 <td>{session.questionnaireId}</td>
//                 <td>
//                   <Link to={`/results/${session.questionnaireId}/${session.sessionId}`}><u>Results</u></Link>
//                 </td>
//               </tr>
//             </>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default History;

