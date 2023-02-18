import './historyofQ.css'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {json} from  './testjson'

const History = () => {

   const [sessions, setSessions] = useState([]);

  console.log(process.env.REACT_APP_API_SERVER_URL + '/session?onlyIds=false');
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_API_SERVER_URL + '/session?onlyIds=false');
      const json = await response.json();
      console.log(json);
      setSessions(json);
    };
    fetchData();
  }, []);


  return (
    <div>
      <h2>History</h2>
      <table>
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
                  <Link to={`/results/${questionnaire.questionnaireId}/${session._id}`}><u>Results</u></Link>
                </td>
              </>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
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

