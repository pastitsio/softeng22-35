

export const json = {
  "checkErrorsMode": "onValueChanged",
  "elements": [{
    "name": "emailvalidator",
    "type": "text",
    "title": "E-mail Validator",
    "description": "Enter an e-mail address",
    "isRequired": true,
    "validators": [
      { "type": "email" }
    ]
  },
  {
    "type": "radiogroup",
    "name": "haveKids",
    "title": "Do you have a kid(s)?",
    "isRequired": true,
    "choices": ["Yes", "No"],
  },
  {
    "name": "answercountvalidator",
    "type": "checkbox",
    "title": "Answer Count Validator",
    "description": "Select between two to four options",
    "isRequired": true,
    "choices": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6"
    ],
    "colCount": 2,
    "validators": [{
      "type": "answercount",
      "minCount": 2,
      "maxCount": 4
    }]
  }, {
    "name": "regexvalidator",
    "type": "text",
    "title": "RegEx Validator",
    "description": "Enter a password that contains at least one upper-case, one lower-case letter, a digit, and a special character",
    "isRequired": true,
    "validators": [{
      "type": "regex",
      "regex": /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!-@#$*])/,
      "text": "Your password must contain at least one upper-case, one lower-case letter, a digit, and a special character"
    }]
  }, {
    "name": "expressionvalidator",
    "type": "multipletext",
    "title": "Expression Validator",
    "description": "Specify a range of numbers",
    "isRequired": true,
    "items": [{
      "name": "minvalue",
      "title": "Minimum value",
      "isRequired": true,
      "validators": [
        { "type": "numeric" }
      ]
    }, {
      "name": "maxvalue",
      "title": "Maximum value",
      "isRequired": true,
      "validators": [
        { "type": "numeric" }
      ]
    }],
    "validators": [{
      "type": "expression",
      "expression": "{expressionvalidator.minvalue} < {expressionvalidator.maxvalue} or {expressionvalidator.minvalue} empty or {expressionvalidator.maxvalue} empty",
      "text": "The minimum value must not exceed the maximum value"
    }]
  }],
  "showQuestionNumbers": true
};

