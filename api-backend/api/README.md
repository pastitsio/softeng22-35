# Rest Api Documentation

## Base URL: https://localhost:4000/

### Endpoints
   1. questionnaire <br/>
      Στέλνει σε μορφή json ή csv ενα ερωτηματολόγιο.
      ```json
         Type: GET,
         URL: http://localhost:4000/questionnaire/:questionnaireID,
         Reply:{
                  "questionnaireID": "testQQ00",
                  "questionnaireTitle": "My first research questionnaire",
                  "keywords": ["footbal", "islands", "timezone"],
                  "questions": [
                     {
                       "qID": "testP00",
                       "qtext": "Ποιο είναι το mail σας;",
                       "required": "FALSE",
                       "type": "profile",
                       "options": [
                         {
                           "optID": "P00TXT",
                           "opttxt": "<open string>",
                           "nextqID": "testP01"
                         }
                       ]
                     },
                     {
                       "qID": "testQ01",
                       "qtext": "Ποιο είναι το αγαπημένο σας χρώμα;",
                       "required": "TRUE",
                       "type": "question",
                       "options": [
                         {
                           "optID": "Q01A1",
                           "opttxt": "Πράσινο",
                           "nextqID": "testQ02"
                         },
                 
                         {
                           "optID": "Q01A2",
                           "opttxt": "Κόκκινο",
                           "nextqID": "testQ02"
                         },
                 
                         {
                           "optID": "Q01A3",
                           "opttxt": "Κίτρινο",
                           "nextqID": "testQ02"
                         }
                       ]
                     }
                  ]
               }
         ```
   2. question <br/>
      Στέλνει μια ερώτηση απο ενα ερωωτηματολόγιο σε μορφή json.
      ```json
      Type: GET,
      URL: http://localhost:4000/question/:questionnaireID/:questionID,
      Reply:{
              "qID": "testQ01",
              "qtext": "Ποιο είναι το αγαπημένο σας χρώμα;",
              "required": "TRUE",
              "type": "question",
              "options": [
                {
                  "optID": "Q01A1",
                  "opttxt": "Πράσινο",
                  "nextqID": "testQ02"
                },
        
                {
                  "optID": "Q01A2",
                  "opttxt": "Κόκκινο",
                  "nextqID": "testQ02"
                },
        
                {
                  "optID": "Q01A3",
                  "opttxt": "Κίτρινο",
                  "nextqID": "testQ02"
                }
              ]
            }
      ```
   3. doanswer <br/>
      Καταχωρεί στην βάση δεδομένων μια απάντηση σε μια ερώτηση ενός ερωτηματολογίου.
      ```json
      Type: POST,
      URL: http://localhost:4000/doanswer/:questionnaireID/:questionID/:session/:optionID,
      Reply:{
               "success": true,
               "message": "Answer uploaded."
            }
      ```
   4. getsessionanswers <br/>
      Στένει σε μορφή json τις απαντήσεις που έχουν δοθεί σε ένα ερωτηματολόγιο απο κάποιον χρήστη.
      ```json
      Type: GET,
      URL: http://localhost:4000/getsessionanswers/:questionnaireID/:session,
      Reply:{
             "questionnaireId": "testQQ00",
             "session": "12345",
             "answers": [
                  {
                     "qID": "testQ01",
                     "optID": "Q01A1",
                     "_id": "63e3ddce5fdf75d2582030c9"
                 },
                 {
                     "qID": "testQ04",
                     "optID": "Q04A1",
                     "_id": "63ebd1a9312c60d3cafc49a4"
                 },
                 {
                     "qID": "testQ05",
                     "optID": "Q05A1",
                     "_id": "63ebd200312c60d3cafc49b7"
                 }
               ]
            }
      ```
   5. getquestionanswers <br/>
      Στέλνει σε μορφή json όλες τις απαντήσεις που έχουν δοθεί σε μια συγκεκριμένη ερώτηση.
      ```json
      Type: GET,
      URL: http://localhost:4000}/getquestionanswers/:questionnaireID/:questionID,
      Reply:{
              "questionnaireId": "testQQ00",
              "questionID": "testQ04",
              "ret": [
                  {
                      "session": "12345",
                      "ans": "Q04A1"
                  },
                  {
                      "session": "6789",
                      "ans": "Q04A2"
                  }
              ]
            }
      ```
      

### Admin Endpoints
   1. healthcheck <br/>
      Ελέγχει τη σύνδεση με την βάση δεδομένων.
      ```json
         Type: GET,
         URL: http://localhost:4000/admin/healthcheck,
         Reply: {
            "status": "OK",
            "dbconnection": "Database connected and ready to use."
            }
         ```
   2. questionnaire_upd <br/>
      Κάνει upload ένα καινούριο ερωτηματολόγιο.
      ```json
      Type: POST,
      URL: http://localhost:4000/admin/questionnaire_upd,
      Encoding: multipart/form-data,
      file: path_to_file/test.json,
      {"file":
         {
            "questionnaireID": "testQQ00",
            "questionnaireTitle": "My first research questionnaire",
            "keywords": ["footbal", "islands", "timezone"],
            "questions": [
               {
                 "qID": "testP00",
                 "qtext": "Ποιο είναι το mail σας;",
                 "required": "FALSE",
                 "type": "profile",
                 "options": [
                   {
                     "optID": "P00TXT",
                     "opttxt": "<open string>",
                     "nextqID": "testP01"
                   }
                 ]
               },
               {
                 "qID": "testQ01",
                 "qtext": "Ποιο είναι το αγαπημένο σας χρώμα;",
                 "required": "TRUE",
                 "type": "question",
                 "options": [
                   {
                     "optID": "Q01A1",
                     "opttxt": "Πράσινο",
                     "nextqID": "testQ02"
                   },
           
                   {
                     "optID": "Q01A2",
                     "opttxt": "Κόκκινο",
                     "nextqID": "testQ02"
                   },
           
                   {
                     "optID": "Q01A3",
                     "opttxt": "Κίτρινο",
                     "nextqID": "testQ02"
                   }
                 ]
               }
            ]
         }
      }
      Reply: {
            "message": "`Uploaded Questionnaire testQQ00 with questions [testP00,testQ01]"
         }
      ```
   3. resetall <br/>
      Διαγράφει όλα τα δεδομένα απο την βάση δεδομένων.
      ```json
      Type: POST,
      URL: http://localhost:4000/admin/resetall,
      Reply: {
            "status": "OK"
         }
      ```
   4. resetq <br/>
      Διαγράφει όλες τι απαντήσεις απο την βάση δεδομένων για ενα ερωτηματολόγιο.
      ```json
      Type: POST,
      URL: http://localhost:4000/admin/resetq/:questionnaireID,
      Reply: {
            "status": "OK"
         }
      ```


