const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();

// ------------------------------
// Initialization
// ------------------------------

const backPages = new Stack();
const nextPages = new Stack();
let currentPage = 'www.codecademy.com'

// ------------------------------
// Helper Functions
// ------------------------------

const showCurrentPage = (action) => {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log('Back page = ', backPages.peek());
  console.log('Next page = ', nextPages.peek());
};

const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;
  
  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }

  showCurrentPage("NEW: ");

};

const backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();

  showCurrentPage("STEP BACK: ");
};

const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();

  showCurrentPage("STEP FORWARD: ");
};

/*
 * The following strings are used to prompt the user
 */

const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------

let showNext = false;
let showBack = false;

showCurrentPage("DEFAULT: ");

const input = () => {
  let instructions = baseInfo;

  if (backPages.peek() !== null) {
    instructions = instructions + ", " + backInfo;
    showBack = true;
  } else {
    showBack = false;
  }

  if (nextPages.peek() !== null) {
    instructions = instructions + ', ' + nextInfo;
    showNext = true;
  } else {
    showNext = false;
  }

  instructions = instructions + ', ' + quitInfo;
  console.log(instructions);

  let userInput = prompt(question);
  const lowerCaseInput = userInput.toLowerCase();
  return lowerCaseInput;
};

  // ------------------------------
  // User Interface Part 2
  // ------------------------------

let finish = false;
while (!finish) {
  let lowerCaseAnswer = input();

  if (lowerCaseAnswer === 'b' || lowerCaseAnswer === 'n' || lowerCaseAnswer === 'q') {
    if (lowerCaseAnswer === 'b') {
      if (backPages.peek() !== null) {
        backPage()
        } else {
          console.log('Unfortunately you cannot go back.')
        };
    };

    if (lowerCaseAnswer === 'n') {
      if (nextPages.peek() !== null) {
        nextPage()
        } else {
          console.log('Unfortunately you are at the last page');
        };
    };

    if (lowerCaseAnswer === 'q') {
      finish = true;
      return;
    }

  } else {
    newPage(lowerCaseAnswer);
  };
}

