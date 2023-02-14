

// import './historyofQ.css'
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const History = () => {
//   const [history, setHistory] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [results, setResults] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios.get("https://your-api-endpoint.com/history");
//       setHistory(result.data);
//     };
//     fetchData();
//   }, []);

//   const handleViewResults = async (id) => {
//     const result = await axios.get(`https://your-api-endpoint.com/results/${id}`);
//     setResults(result.data);
//     setSelectedId(id);
//   };

//   return (
//     <div>
//       <h2>History</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Questionnaire Title</th>
//             <th>Session ID</th>
//             <th>Results</th>
//           </tr>
//         </thead>
//         <tbody>
//           {history.map((item) => (
//             <tr key={item.id}>
//               <td>{item.title}</td>
//               <td>
//                 <button onClick={() => handleViewResults(item.id)}>
//                   Results
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {selectedId && (
//         <div>
//           <h2>Results for Questionnaire ID {selectedId}</h2>
//           <pre>{JSON.stringify(results, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;


import './historyofQ.css'
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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
