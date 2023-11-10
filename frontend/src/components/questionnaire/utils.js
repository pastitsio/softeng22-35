function refreshResults(currentqId, val, isVisible) {
  var nextqId = val.target.attributes.next.value;
  var ret = Array.from(isVisible);
  if (ret.includes(nextqId) === false) {
    if (ret.includes(currentqId)) {
      let currentqIdIdx = isVisible.findIndex(id => id === currentqId);
      ret = ret.slice(0, currentqIdIdx + 1);
    }
    ret.push(nextqId);
  }
  return ret;
}


function unparametrize(questions) {
  questions.forEach(question => {
    // construct parametrized options
    var m, matches = [];
    const regex = /(?:(?:\[\*(\w+)\])+)/gm;
    while ((m = regex.exec(question.questionText)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      matches.push(m.map((match, groupIndex) => match).at(1));
    }
    if (matches.length !== 0) {
      let parametricQuestionId, parametricOptionId;
      [parametricOptionId, parametricQuestionId] = matches;

      let replaceOption = questions
        .find(q => q._id === parametricQuestionId)
        .options
        .find(o => o._id === parametricOptionId);

      question.questionText = question.questionText.replace(/\[(\*\w+)\]/m, `[${replaceOption.optionText}]`);

      let questionToReplace = questions.find(q => q._id === parametricQuestionId); // +1 because first question is email question, hardcoded.
      question.questionText = question.questionText.replace(/\[(\*\w+)\]/m, `[${questionToReplace.questionText}]`);
    }
  })
  return questions;
}

export { refreshResults, unparametrize };