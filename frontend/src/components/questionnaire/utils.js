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
    while ((m = regex.exec(question.qText)) !== null) {
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
        .find(o => o.optId === parametricOptionId);

      question.qText = question.qText.replace(/\[(\*\w+)\]/m, `[${replaceOption.optText}]`);

      let questionToReplace = questions.find(q => q._id === parametricQuestionId); // +1 because first question is email question, hardcoded.
      question.qText = question.qText.replace(/\[(\*\w+)\]/m, `[${questionToReplace.qText}]`);
    }
  })
  return questions;
}

export { refreshResults, unparametrize };