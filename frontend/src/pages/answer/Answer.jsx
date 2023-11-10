import React, { useEffect, useState } from "react";
import { Filters } from "../../components";

import './answer.css'

const Answer = () => {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
      // declare the async data fetching function
      const fetchData = async () => {
          // get the data from the api
          let url = `${process.env.REACT_APP_API_SERVER_URL}/questionnaire`;
          console.log(`GET ${url}`);
          const response = await fetch(url);
          // const response = await fetch(test_input);
          const json = await response.json();
          // set state with the result
          setQuestionnaires(json);
      }

      // call the function
      fetchData()
          // make sure to catch any error
          .catch(console.error);;
  }, []);
  

  return (
    <div className="Answer">
      <Filters questionnaires={questionnaires} />
    </div>
  );

}



export default Answer;