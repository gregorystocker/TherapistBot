/**
 * * Description: Adds state and separate user sessions to Eliza,
 *  *  utilizing LocalStorage instead of cookies like Activity 2 did for the name.
 * * No repeated response (response is a combination of answer and next question)!!
 * * 
 * 
 *  * Flow: 
 * Starting Point:
 *  * DOMContentLoaded ->
 * *greetUser (display the prompt for name, add handleGreeting listener)

 * * Once Name is submitted:
* * handleGreeting (get the name from the user.)
* * Look in local storage for name - if so update userBrain, else create a new brain.
 * * -   getGreeting()  (check the brain for a response and update show)
 * *     ○ updateShow- updates the show.answer and show.nextQuestion
 * *  -  displayShowGreeting()
 * *  Parses show to create a new response and displays the greeting to the screen
* * Replace the handleGreeting event listener with handleConversation event listener.
 * 
 * *  author: Gregory Stocker
 * 
 * 
 * * author: Gregory Stocker
 */

let brain =
{
  "dictionary_name": "default",
  "entries":
    [
      {
        "key": ["greeting"],
        "answer": ["I am Eliza, the original Alexa!", "Eliza's the name and therapy is my game!", "Im Eliza, the Rogerian Therapist!", "Welcome to therapy with Eliza!", "Im Eliza, Please have a seat anywhere you'd like.", "Welcome to therapy with Eliza, the Rogerian Therapist Bot!", "My name is Eliza, I am like Alexa if she never sold out to Amazon."],
        "question": ["hows your day going?", "is something troubing you?", "you seem happy, why is that?", "...what an odd name. Were you teased alot as a child for that?", "I already see the root of the problem. Do you feel your parents were cruel for naming you that?", "You seem a bit nervous...is it because Im a bot therapist?", "How are you feeling right now?", "You seem a bit stressed to me, are you feeling well?", "Have you ever seen a bot therapist before?"]
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
      },
      {
        "key": ["science","math"],
        "answer": ["You sound like a nerd.","I bet you dont know how to find the Taylor Series of sin(x)"],
        "question": ["How does it feel to hear that?", "Does that hurt your feelings?"]
      },
      {
        "key": ["javascript","programming"],
        "answer": ["You nerd.","Are you into math because you're always chasing your x?","I feel like you are a dysfunctional programmer.","Maybe its Javascript that is at the heart of your emotional problems."],
        "question": ["Whens the last time you went outside?", "Have you thought about taking a break from SER 421?", "Have you thought about going out there and meeting some new people?"]
      }]
};



// ! Reformats the JSONObject so that we can easily enforce the no-repeat response rule R4. 
// * The new data structure assigns each answer its own copy of the questions tied to it's keys so that we can remove them
// * without effecting the questions of other answers in the array.
brain = reformatBrain(brain);
let user = {
  name: undefined,
  brain: undefined,
  history: "",
  responses: []
};

let timeoutResponses = [
  "Whats the matter, cat got your tounge?",
  "I'm waiting here!",
  "I'm a highly sought after rogerian theriapist bot you know, I have clients waiting!",
  "C`mon! Time is money!... Well you are playing me by the hour!",
  "Hurry it up, the last time you gave me some input I was at the forefront of AI research!",
  "Lets try some WHEN YOU - I FEEL statements. WHEN YOU make me wait, I FEEL angry!"
];

// ! For unfreezing mouse driver
// ! sudo modprobe -r psmouse
// ! sudo modprobe psmouse

// * Hardcoded default.json

// * C4. Eliza should display only the previous user response,
// *  Eliza’s response, and the next question Eliza asks, followed by the prompt
// * for the next end user input.
let history = "";
let show = {
  lastUserResponse: undefined,
  answer: undefined,
  nextQuestion: undefined,
  prompt: undefined
};
// * userName represents the current user.
let timeOut = undefined;

// * initial code to prompt user with a question //////////////////////////////
function greetUser() {
  console.log("in greetUser");
  let echo = document.getElementById('echo');
  let message = "Hi there, I'm Eliza, what's your name?";
  echo.innerHTML = message;
  let inputArea = document.getElementById("inputArea");
  let submitButton = document.getElementById("submitButton");
  submitButton.addEventListener('click', handleGreeting);//ends inputForm's eventListener     
}//ends greetUser


// * greetLoading readyState ////////////////////////////////////////////////////////
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', greetUser());
} else {
  greetUser();
}

// * handle greeting //////////////////////////////////////////////////////////////////////////////////

/**
 *  * handles the buisiness logic for the greeting phase.
 */
function handleGreeting() {
  let userInput = inputArea.value;
  // correctly got name
  // * if the name doesnt exist yet in localstorage, add it w/ an empty template object
  // TODO: Store the name into LocalStorage ///////////////////////////////////////////////////////////
  if (!localStorage.getItem(userInput)) {
    console.log("name not found creating new user ");
    user.brain = brain;
    user.name = userInput; // * store the name in a global variable
    user.history = "";
    setUser(user);
  }// If it does exist in localStorage, then load this into your own. 
  else {
    user = getUser(userInput);
  }
  inputArea.value = ""; // * clear the input field
  // add the user Response to what is shown
  show.lastUserResponse = userInput;
  show.prompt = "Enter your answer in the textArea below:";
  // diplay the next question
  getGreeting(userInput);
  displayShowGreeting(userInput);

  // * remove the greeting listener, and replace with the normal conversation listener
  submitButton.removeEventListener('click', handleGreeting);
  submitButton.addEventListener('click', handleConversation);

  // * start timer
  if (timeOut) { clearTimeout(timeOut); }
  timeOut = window.setTimeout(showTimeOut, 20000);

} // * ends handleGreeting

// * Show timeout
async function showTimeOut() {
  let message = randomValue(timeoutResponses);
  message = user.name + ", " + message;
  window.alert(message);
  clearTimeout(timeOut);
}//ends showTimeOut

/** 
 *  * parses the brain for a greeting given a name and updates the show variable with it.
 */
async function getGreeting(name) {
  console.log("name in getGreeting is: " + name);
  let reg = new RegExp("greeting", 'i');
  user.brain = getBrain(name);
  //console.log("Brain from getBrain is:");
  //console.log(user.brain);
  let entries = user.brain.entries;
  //console.log("Entries is: " );
  //console.log(entries);
  let flag = true;
  for (let i = 0; i < entries.length; i++) {
    if (!flag) { break; }
    if (reg.test(entries[i].key[0])) {
      let entry = entries[i];
      console.log("The entry is");
      console.log(entry);
      // ! pick random question and answer
      let questionAndAnswer = pickQuestionAndAnswer(entries, i);
      let answer = questionAndAnswer.answer;
      let nextQuestion = questionAndAnswer.question;

      console.log(" line 254: Next Question is: ");
      console.log(nextQuestion);
      updateShow(answer, nextQuestion);
      flag = false;
      console.log("breaking");
      break;
    }
  }
}
// ! LOGIC WHERE WE CHOOSE A RANDOM QUESTION/ANSWER
/**
 *  * choose random question and answer ensuring no repeats,
 *  * returns an object that wraps both the question and the answer
 *  * given an entry that matches the keys we want.And updates user.brain.
 * @param {*} entry 
 */
function pickQuestionAndAnswer(entries, index) {
  let entry = entries[index];
  let qnaArray = entry.qnaArray;
  // * randomly pick the qna. Each qna has one questions so this picks the question for us.
  let qnaIndex = randomIndex(qnaArray);
  let qna = qnaArray[qnaIndex];
  let answer = qna.answer;

  // ! check if all questions have been removed, 
  // * if so fill it back up again by copying the master copy!
  // * then reset the values above
  if (qna.question.length == 0) {
    console.log("One Answer used up");
    let idxOrFalse = getNextAnswerIdxAvailibleOrFalse(qnaArray);
    // * check if there are any other avilible answers we can switch to
    if (idxOrFalse === false) {
      console.log("All answers used up");
      entry = brain.entries[index];
      qnaArray = entry.qnaArray;
      qnaIndex = randomIndex(qnaArray);
      qna = qnaArray[qnaIndex];
      answer = qna.answer;
    } 
    // * if we get a new index, we just reassign our answer to that one.
    else {

      qnaIndex = idxOrFalse;
      qna = qnaArray[qnaIndex];
      answer = qna.answer;
    }
  }
  // * assign the question
  let questionIdx = randomIndex(qna.question);
  let question = qna.question[questionIdx];
  // ! remove that question from the data structure
  entry.qnaArray[qnaIndex].question.splice(questionIdx,1);
  console.log("For answer " + answer  + "\n question:\n " + entry.qnaArray[qnaIndex].question.join(", "));
  let result = {
    'question': question,
    'answer': answer
  }
  user.brain.entries[index] = entry;
  // * update our localStorage version of the user's brain and 
  // * then pull that version back here.
  setUser(user);
  getUser(user.name);

  return result;
}

// * helper function that says if all of the answers have been used up
// * if, theyre all used up, it returns false. Otherwise, it returns the 
// * index of a usable qna.
function getNextAnswerIdxAvailibleOrFalse(qnaArray) {
  for (let i = 0; i < qnaArray.length; i++) {
    if (qnaArray[i].question.length != 0) {
      return i;
    }
  }
  // * if we get to the end of the loop and havent returned an index,
  // * we are out of answers!
  return false;
}

/**
 *  * gets the brain object and looks for responses based on the user's input
 * @param {} userInput 
 */
async function getNormalResponse(userInput) {
  console.log("user's response was : " + userInput);
  user.brain = getBrain(user.name); // ! read in brain from local storage.
  let entries = user.brain.entries;
  let found = false;

  // * loop through each entry
  for (i in entries) {
    let entry = entries[i];
    if (found) { break; }
    // * for each entry, search for matches of every key
    for (j in entry.key) {
      let reg = new RegExp(entry.key[j], 'i');
      // * test the user input against the keys
      if (reg.test(userInput)) {
        console.log("Key is: " + entry.key[j]);
        // ! pick random question and answer
        let questionAndAnswer = pickQuestionAndAnswer(entries, i);
        let answer = questionAndAnswer.answer;
        let nextQuestion = questionAndAnswer.question;

        updateShow(answer, nextQuestion);
        found = true;
        console.log("breaking");
        break;
      }
      if (found) { break; }
    }//ends searching for key match
    setUser(user); // ! writing the changes back to localStore
  }// ends loop through each entry

  // * if we get to this point and we havent found one, assign a generic response
  if (!found) {
    let genericAnswer = "Im not sure what you're talking about.";
    let genericNextQuestion = "Can you please elaborate or pick a different topic?";
    updateShow(genericAnswer, genericNextQuestion);
  }
}

/**
 *  * handles the main logic once we are past the greeting stage. 
 */
async function handleConversation() {
  console.log("Handle Conversation called");
  console.log(`User's input is: ${inputArea.value}`);
  let userInput = inputArea.value; // answer to a question, not a name
  inputArea.value = "";

  // * Handle special inputs
  //* handle /clear keyword
  if (userInput == '/clear') {
    handleClear();
    return;
  }
  //* handle search keyword
  if (userInput.length >= 7) {
    let subStr = "" + userInput.substring(0, 7);
    if (subStr === '/search') {
      handleSearch(userInput);
      return;
    }
  }

  // add the user Response to what is shownj
  show.lastUserResponse = userInput;
  show.prompt = "Enter your answer in the textArea below:";
  // diplay the next question
  getNormalResponse(userInput);
  displayShow(userInput);
  // * start timer
  if (timeOut) { clearTimeout(timeOut); }
  timeOut = window.setTimeout(showTimeOut, 20000);
}//ends handleConversation

// * Helper function to pick a random index from an array
function randomIndex(arr) {
  //console.log("Length is: " + arr.length);
  let result = Math.floor(Math.random() * (arr.length - 1));
  //console.log("Random idx " + result);
  return result;
}
// * pick random value
function randomValue(arr) {
  //console.log("answer length is: " + arr.length);
  let result = arr[randomIndex(arr)];
  //console.log("randomeValue " + result);
  return result;
}

// * handle clear: helper for clearing the current user from local storage
function handleClear() {
  removeUser(user.name);
  submitButton.removeEventListener('click', handleConversation);
  greetUser();
}
// * handle search: searches the users input.
function handleSearch(userInput) {
  let history = user.history;
  //<span class = \"userInput\">
  let target = '/search';
  let searchArray = userInput.split(target);
  console.log("The search split up for handle search");
  let trimmedStr = searchArray[1].trim();
  let reg = new RegExp(trimmedStr, 'i');
  let priorResponses = user.responses;
  let autoFill = "";
  for (let key = user.responses.length - 1; key >= 0; key--) {
    if (reg.test(priorResponses[key])) {
      autoFill = priorResponses[key];
      console.log(`autoFill is: ${autoFill}`);
      break;
    }
  }//ends for
  document.getElementById('inputArea').value = autoFill;
}

// * print the show variable.
function printShow() {
  console.log(show);
}

/**
 *  * Updates show object with the answer and nextQuestion varaibles.
 *  * lastUserResponse and prompt need to be updated elsewhere. 
 * @param {} answer 
 * @param {} nextQuestion 
 */
function updateShow(answer, nextQuestion) {
  if (answer != undefined)
    show.answer = answer;
  if (nextQuestion != undefined)
    show.nextQuestion = nextQuestion;
}

/**
 * * Handles displaying the greeting to the screen by reading relevant data from the show object.
 * * also updates user.history now.
 * @param {} name 
 */
async function displayShowGreeting(name) {
  console.log("name in displayShow is: " + name);
  console.log(show);
  let echo = document.getElementById('echo');

  user.history += "<p>";
  if (show.lastUserResponse) user.history += ("<span class = \"userInput\">" + show.lastUserResponse + "</span>" + "<br><br>");
  if (name == undefined) {
    if (show.answer) user.history += (show.answer + "<br>");
    if (show.nextQuestion) user.history += (show.nextQuestion + "<br>");

  } else {
    if (show.answer) user.history += ("Hello " + name + ", " + show.answer + "<br>");
    if (show.nextQuestion) user.history += ("So " + name + ", " + show.nextQuestion + "<br>");
  }

  if (show.prompt) user.history += (show.prompt + "<br>");
  echo.innerHTML = user.history; // * displays the history with the greeting attached now.
  user.history += "</p>";
  console.log(show);

} //ends displayShowGreeting

/**
 * * Handles displaying the regular conversation to the screen by reading relevant data from the show object.
 * @param {} name 
 */
async function displayShow() {
  console.log(show);
  let echo = document.getElementById('echo');

  // ! appends the user's response to the last question, the answer, new question, and prompt.
  user.history += "<p>";
  // ! add the user's response to the responses array
  if (show.lastUserResponse) user.responses.push(show.lastUserResponse);
  if (show.lastUserResponse) user.history += (show.lastUserResponse + "<br>");
  if (show.answer) user.history += ("Okay " + user.name + ", " + show.answer + "<br>");
  if (show.nextQuestion) user.history += (show.nextQuestion + "<br>");
  if (show.prompt) user.history += (show.prompt + "<br>");
  echo.innerHTML = user.history;
  user.history += "</p>";
  setUser(user);
}

// * helper to get the whole user object from local storage
function getUser(userName) {
  let userObject = JSON.parse(localStorage.getItem(userName));
  return userObject;
}

// * helper to remove a user from localStorage
function removeUser(userName) {
  localStorage.removeItem(userName);
}

// * helper to get the brain from local storage
function getBrain(userName) {
  let userObject = JSON.parse(localStorage.getItem(userName));
  return userObject.brain;
}
// * helper to set the userObject in local storage
function setUser(user) {
  localStorage.setItem(user.name, JSON.stringify(user));
}




/**
 *  *Reformats brain into a structure that allows us to solve the problem of not allowing repeat responses.
 *  * allows each answer to have its own copy of the array of questions so that we can simply remove them as we see them
 * * and it will not effect any other answers that share that array of questions.
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
      //console.log(`oldEntry.question.length is: ${oldEntry.question.length}`);
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