	var words = ['cat', 'beatific', 'javascript', 'benevolent', 'fluffy', 'geography', 'jupiter', 'saturn', 'fundamental', 'introduction'];
	// var words = ["cat"];  //set to cat just to keep testing short since selectRandomWord() works fine
	var alphabet;
	var target;
	var userInput;
	var lowerCaseUserInput;
	var lettersInWord;
	var underScore;
	var bool;
	var inValidInput;
	var letterPositionsInWord;
	var lettersUsed = [];




	// selects word at random
	function selectRandomWord() {
		var randomNumber = Math.random() * words.length;
		var randomNumberInt = Math.floor(randomNumber);
		target = words[randomNumberInt];
		// alert(target); //shows randomly selected word for testing purposes 
		return alert("My word is " + target.length + " letters long.");
	}


	// checks if user input is in randomly selected word
	function isLetterInWord() {
		//lettersUsed.push(userInput);  //keeps track of all userinputs to let the user know what has already been used.
		lowerCaseUserInput = userInput.toLowerCase(); 
		if ((lettersUsed.indexOf(lowerCaseUserInput) > -1) === true) {  // returns false if input has already been entered/ This will be moved to checkInput()
			alert("Letter has already been used.  Please enter a different letter.");
			return false;
		}
		else if ((target.indexOf(lowerCaseUserInput) > -1) === false) {
			lettersUsed.push(userInput); //keeps track of all userinputs to let the user know what has already been used.
			alert("Please try again.");
			return false;
		} 
		else {
			lettersUsed.push(userInput);
			return true;
		}
	}	

	// checks for invalid input
	function checkInput() {
		lowerCaseUserInput = userInput.toLowerCase();
		if (userInput.length === 0) {   // returns false if prompt pop up dismissed without entering any input
			alert("Please only enter a single letter."); 
			return false;
		}
		else if ((alphabet.indexOf(lowerCaseUserInput) > -1) === false) { // returns false if input is a non alphabet character
			alert("Please only enter letters of the alphabet.");
			return false;
		}
		else if (userInput.length > 1) {   // returns false if more than one character is entered 
			alert("Please only enter a single letter.");
			return false;
		}
	}




	//counts how many of user input is in word
	function letterCount() {
		var lowerCaseTarget = target.toLowerCase();
		var lowerCaseUserInput = userInput.toLowerCase();
		var letterArray = [];
		for(var i = 0; i <= lowerCaseTarget.length; i++)
			if (lowerCaseTarget[i] == lowerCaseUserInput) {
				letterArray.push(target[i]);
			}
		if (letterArray.length == 1) {
			return alert("Yes! " + lowerCaseUserInput + " is in my word.\n\n" + "There is only " + letterArray.length + " " + userInput + " in my word.");
		}
		else {
			return alert("Yes! " + lowerCaseUserInput + " is in my word.\n\n" + "There are " + letterArray.length + " " + userInput +"'s in my word.");
		}
	}


	//creates array with indexes of user input in word
	function getLetterIndexes() {
		var targetArray = target.split("");
		var letterIndex = [];
		for(var i = 0; i < targetArray.length; i++) {
			if (targetArray[i] == userInput) {
				letterIndex.push(i);
			}
		}
		return letterIndex;
	}


	//show user where correct letter is in word
	var underScoreArray = []; //called underScoreArray because of a function that will be implemented in the future that shows underscores for empty spaces
	function showLetterPositions() {
		var letterIndex = getLetterIndexes();
		for(var i = 0; i < letterIndex.length; i++) {
			underScoreArray[letterIndex[i]] = userInput;
		}
		return alert("Here are where the letters fit in my word.\n\n" + underScoreArray.join(" "));
	}


	//puts all the functions together and initiates Hangman Game
	function main() {
		alphabet = "abcdefghijklmnopqrstuvwxyz";
		var correctGuesses = 0;
		var incorrectGuesses = 0;
		var finish = false;
		selectRandomWord();
		alert("Here are the letters you have to choose from:\n\n" + alphabet);
		while(!finish) {
			userInput = prompt("Please enter a letter of the alphabet.");
			isUserCorrect = isLetterInWord();
			inValidInput = checkInput();
			// if isletterInWord or inValidInput returns false, guess gets counted as incorrect
			if (isUserCorrect === false || inValidInput === false) {
				showLetterPositions();
				incorrectGuesses += 1;
				if (incorrectGuesses === 10) { 
					alert("Game Over");
					break;
				}
			}
			// if isLetterInWord returns true, guess gets counted as correct
			else if (isUserCorrect === true) {  
				letterCount();
				showLetterPositions();
				correctGuesses += 1;
				if (underScoreArray.join("") === target) {
					alert("You've Won!!");
					break;
				}
			}
			alert("Letters you've used:\n\n" + lettersUsed);
		}
	}