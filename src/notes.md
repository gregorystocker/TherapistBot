# Activity 3 notes


```
R1 - [X] Display a running dialouge of the entire convo.
R2 - [X] Save the responses to <name>. If browser closes and restarts, and you enter the same name, you can restore that person's conversation.
R3 - [X] Add a "/clear" operation that clears the state of the app for <name>, then returns the app to the start form.
R4 - [] Ensures no responses are repeated until all responses are given at least once.
        A response consists of a question/answer pair.
R5 - [X] Add a special /search key operation that searches the coversation for the most recent user input containing a key. can copies that entire previous input into the one-line uer input area.
```
Constraints:
 - [X] Use session or local storage for persistence.

 
 ## Plan so far
```
To achieve multiple users I can:
Use localStorage.


R2 (separate users with their own session)
I can store key value pairs in localstorage, but I can store a full json object and just 
stringify to store it and parse to access it.

I should undo the cookies implementation I had of users.
I should ask for the name at the beginning of each new login and do a lookup for that name
in my users stored in local storage.

R1 (I can just append the full convo to the localstorage and read it out again)

R3 Just check if their input is /clear and if it is, delete everything associated w/ that user from the local storage.

R4 I can keep a separate object representing the "brain" and pop, each question as it comes up. Once all questions have been popped for an answer, 

R5 Just use a Regexp to search for the first match of a string.
Load that string into the input box by setting the innerHTML.



```

## LocalStorage object (per user)
```
Access the current user's brain through userBrain
name, 
brain: (should have used answers popped from it),
conversation history



```