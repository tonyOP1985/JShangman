

// selects word at random
function selectRandomWord() {
	// var words = ['cat', 'beatific', 'javascript', 'benevolent', 'fluffy', 'geography', 'jupiter', 'saturn', 'fundamental', 'introduction'];
	var words = ['fluffy']; // using one word for testing
	var randomNumber = Math.random() * words.length;
	var randomNumberInt = Math.floor(randomNumber);
	var target = words[randomNumberInt];
	alert("My word is " + target.length + " letters long.");
	return target;
}


// determines in userinput is valid
function checkInput(userInput, alphabet) {
	if (userInput.length === 0) { //checks if input was entered
		return false;
	}
	else if (userInput.length > 1) {  // returns false if more than one letter is entered
		return false;
	}
	else if ((alphabet.indexOf(userInput) > -1) === false) { // returns false if userinput is not a letter of the alphabet
		return false;
	}
}


// determines if user input is in target
function isLetterInWord(word, userInput) {
	if ((word.indexOf(userInput) > -1) === false) {   // returns false if user input is not in target
		return false;
	}
	else {
		return true;   // returns true is user input is in target
	}
}



// creates an array that has indexes of each letter of target
function getLetterIndexs(word, userInput) {   
	var wordArray = word.split("");
	var letterIndex = [];
	for(var i = 0; i < wordArray.length; i++) {
		if (wordArray[i] === userInput) {
			letterIndex.push(i);
		}
	}
	return letterIndex;
}


// shows where correct user input is in target  
function showLetterPositions(word, userInput, array) {
	var index = getLetterIndexs(word, userInput);
	for(var i = 0; i < index.length; i++) {
		array[index[i]] = userInput;
	}
	return array;
}



// implements hangman game
function hangManMain() {
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	var usedLetters = [];
	var correctInputArray = [];
	var incorrectGuesses = 0;
	var finish = false;
	alert("Welcome to Hangman!");
	var ranWord = selectRandomWord();
	while(!finish) {
		var userInput = prompt("Please a letter of the alphabet.");
		var lowerCaseUserInput = userInput.toLowerCase(); 
		if ((alphabet.indexOf(lowerCaseUserInput) > - 1) === true && lowerCaseUserInput.length === 1) { // creates array of correct or incorrect valid input to show what has already been used
			usedLetters.push(lowerCaseUserInput);
		}
		var isInputValid = checkInput(lowerCaseUserInput, alphabet);
		var isInputCorrect = isLetterInWord(ranWord, lowerCaseUserInput);
		if (isInputValid === false || isInputCorrect === false) {
			incorrectGuesses += 1;
			if (incorrectGuesses === 10) {
				alert("Game Over!");
				break;
			}
			else {
				alert("Please Try again.");
				if (usedLetters.length > 0) { // invalid input of more than letter of the alphabet does not get pushed to usedletters
					alert("Here are the letters you've used so far.\n\n" + usedLetters);
				}
			}
		}
		else if (isInputCorrect === true) {
			alert("Yes! " + lowerCaseUserInput + " is in my word!");
			var letterPositions = showLetterPositions(ranWord, lowerCaseUserInput, correctInputArray);
			alert("Here are where the letters fit in my word.\n\n" + letterPositions.join("  "));
			if (letterPositions.join("") === ranWord) {  
				alert("You've Won!");
				break;
			}
			alert("Here are the letters you've used so far.\n\n" + usedLetters);
		}
	}
}
