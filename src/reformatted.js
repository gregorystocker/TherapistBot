ORIGINAL


"entries" :[
{
  "key": ["stupid","dumb","idiot","unintelligent","simple-minded","braindead","foolish","unthoughtful"],
  "answer": ["Take your attitude somewhere else.", "I don't have time to listen to insults.", "Just because I don't have a large vocabulary doesn't mean I don't have insults installed."],
  "question": ["Have you thought about how I feel?", "I know you are but what am I?"]
}

// * ONE ANSWER PER QNA, BUT MUTLIPLE QUESITONS.
REFORMATTED:
"entries" : [

  {
  "key": ["stupid","dumb","idiot","unintelligent","simple-minded","braindead","foolish","unthoughtful"],
  "qnaArray": [
    
    {"answer" : "Take your attitude somewhere else.",
     "question" : ["Have you thought about how I feel?", "I know you are but what am I?"]
    },
    {"answer" : "I know you are but what am I?",
      "question" : ["Have you thought about how I feel?", "I know you are but what am I?"]
     }
   ]
}
]


/**
 *  *Reformats brain into a structure that allows us to solve the problem of not allowing repeat responses.
 * @param { } brain 
 * @returns 
 */
 function reformatBrain(brain) {
  // * Answer is a key value: pair of answers and questions
  let result =
  {
    "dictionary_name": "default",
    "entries": []
  }
  let oldEntries = brain.entries;
  for (let i = 0; i < oldEntries.length; i++) {
    let oldEntry = oldEntries[i];
    let entry = {
      key: [],
      qnaArray: []
    };

    // * copy the keys straight over.
    entry.key = oldEntry.key;
    // * for each answer, we make a new qna, which gets one answer, and the full array of questions.
    //console.log(`oldEntry.answer.length is: ${oldEntry.answer.length}`);
    for (let j = 0; j < oldEntry.answer.length; j++) {
        console.log(`oldEntry.question.length is: ${oldEntry.question.length}`);
      let qna = {
        answer: undefined,
        question: []
      }
      // * copy just one answer per qna
      qna.answer = oldEntry.answer[j];
      // * copy the entire question array for each qna
      qna.question = oldEntry.question;
      entry.qnaArray.push(qna);
    }//ends inner j for
    result.entries.push(entry);

  }//ends outer i loop
  return result;
}

/**
 *  * Prints out the reformatted brain.
 * @param {} newBrain 
 */
function printReformatted(newBrain) {
  let str = "";
  let entries = newBrain.entries;
  for (let i = 0; i < entries.length; i++) {
    str += "\nnew Entry\n";
    str += "For keys:";
    str += entries[i].key.join(", ");
    str += "\n";
    let qnaArray = entries[i].qnaArray;

    // * loop through the qnaArray
    for (let j = 0; j < qnaArray.length; j++) {
      let qna = qnaArray[j];
      str += "Answer\n"
      str += qna.answer + "\n";
      str += "Questions:\n"
      str += qna.question.join(", ");
      str += "\n\n"
    }
  }
  console.log(str);
}

let newBrain = reformatBrain(brain);
printReformatted(newBrain);