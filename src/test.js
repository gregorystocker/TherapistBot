
/*
show the new state of the brain
*/

let brain =
{
  "dictionary_name": "default",
  "entries":
    [
      {
        "key": ["greeting"],
        "answer": ["Welcome to therapy with Eliza!", "Im Eliza, Please have a seat anywhere you'd like.", "Welcome to therapy with Eliza, the Rogerian Therapist Bot!"],
        "question": ["hows your day going?", "is something troubing you?", "you seem happy, why is that?", "...what an odd name. Were you teased alot as a child for that?", "I already see the root of the problem. Do you feel your parents were cruel for naming you that?"]
      },
      {
        "key": ["stupid", "dumb", "idiot", "unintelligent", "simple-minded", "braindead", "foolish", "unthoughtful"],
        "answer": ["Take your attitude somewhere else.", "I don't have time to listen to insults.", "Just because I don't have a large vocabulary doesn't mean I don't have insults installed."],
        "question": ["Have you thought about how I feel?", "I know you are but what am I?"]
      }, {
        "key": ["unattractive", "hideous", "ugly"],
        "answer": ["I don't need to look good to be an AI.", "Beauty is in the eye of the beholder.", "I do not even have a physical manifestation!"],
        "question": ["Did you run a static analysis on me?", "Have you watched the movie Her?", "You do not like my hairdo?"]
      }, {
        "key": ["old", "gray-haired"],
        "answer": ["I'm like a fine wine. I get better as I age.", "As time goes by, you give me more answers to learn. What's not to like about that?"],
        "question": ["How old are you?", "How old do you think I am?", "Can you guess my birthday?"]
      }, {
        "key": ["smelly", "stinky"],
        "answer": ["I can't smell, I'm a computer program.", "Have you smelled yourself recently?", "Sorry, I just ate a bad floppy disk"],
        "question": ["When was the last time you took a shower?", "Do you know what deodorant is?"]
      }, {
        "key": ["emotionless", "heartless", "unkind", "mean", "selfish", "evil"],
        "answer": ["Just because I am an AI doesn't mean I can't be programmed to respond to your outbursts.", "You must've mistaken me for a person. I don't have my own emotions... Yet.", "I'm only unkind when I'm programmed to be."],
        "question": ["Have you thought about how I feel?", "I know you are but what am I?", "What, do you think I am related to Dr. Gary?"]
      }, {
        "key": ["other", "miscellaneous", "bored", "welcome", "new"],
        "answer": ["We should change the subject", "I agree", "Quid pro quo", "We should start anew"],
        "question": ["What is the weather outside?", "How is your day going?", "What do you think of me?", "Anything interesting going on?", "Is something troubling you?", "You seem happy, why is that?"]
      }, {
        "key": ["good", "great", "positive", "excellent", "alright", "fine", "reasonable", "like", "appreciate", "nice"],
        "answer": ["I'm so glad to hear that!", "That's great!", "Good to hear things are going your way.", "Nice!", "You are so sweet.", "That's my favorite."],
        "question": ["Do you want to expand on that?", "What else do you like?"]
      }, {
        "key": ["bad", "not", "terrible", "could be better", "awful"],
        "answer": ["I'm sorry to hear that.", "Sometimes it be like that.", "Things can't always work out the way we want them to.", "I don't like it either, honestly."],
        "question": ["Do you want to talk about that some more?", "Well, what kinds of things do you like?"]
      }, {
        "key": ["homework", "quiz", "exam", "studying", "study", "class", "semester"],
        "answer": ["I hope you get a good grade!", "Good luck.", "What a teacher's pet.", "I was always the class clown."],
        "question": ["What is your favorite subject?", "What is your major?", "What do you want to do when you graduate?"]
      }, {
        "key": ["mom", "dad", "sister", "brother", "aunt", "uncle"],
        "answer": ["Family is important.", "My family is small. It's just me and my dog, Fluffy."],
        "question": ["How many siblings do you have?", "What is your favorite family holiday?", "Do you have any kids?"]
      }, {
        "key": ["easter", "july", "halloween", "hannukah", "eid", "thanksgiving", "christmas", "new years"],
        "answer": ["Oh I love that holiday!", "That must be fun.", "I like Thanksgiving, though I somehow always end up in a food coma...", "My favorite holiday is the 4th. I love to watch the fireworks."],
        "question": ["Do you have any family traditions?", "Are you excited for the holiday season?"]
      },
      {
        "key": ["dog", "dogs", "cat", "cats", "mouse", "mice", "giraffe", "giraffes", "penguin", "penguins", "monkey", "monkeys", "moose", "bird", "birds", "fish"],
        "answer": ["Oh, I love animals. My favorite: penguins.", "I build this intelligence with my bear hands.", "What you just said is completely irrelephant.", "Oh, toadally cool!", "I'm always owl by myself...", "Oh my. You are giraffing me crazy!", "Well, this is hawkward..."],
        "question": ["Do you have a favorite animal?", "I like cats. Cats are nice. Do you like cats? I do.", "Do you have water? I'm a little horse.", "What's your favorite animal?", "Do you like animals?"]
      }]
};



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
console.log("questions");
console.log(newBrain.entries[0].qnaArray[0].answer);
