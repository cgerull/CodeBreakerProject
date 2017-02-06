let myAnswer = document.getElementById('answer');
let myAttempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    console.log("answer, attempt, input: " + myAnswer.value + ", " + myAttempt.value + ", " + input.value);
    if ('' === myAnswer.value || '' === myAttempt.value) {
         setHiddenFields();
    }
    if ( !validateInput(input.value) ) {
        return false;
    }
    else {
        myAttempt.value++;
    }
    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    }
    else {
        if (9 < myAttempt.value) {
            setMessage('You Lose! :(');
            showAnswer(false);
            showReplay();
            return false;
        }
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
    var number = Math.floor(Math.random() * 10000).toString();
    while(4 > number.length) {
        number = "0" + number;
    }
    //document.getElementById('answer') = number;
    //document.getElementById('attempt') = 0;
    myAnswer.value = number;
    myAttempt.value = 0;
}

function setMessage(msg) {
    document.getElementById('message').innerHTML = msg;
    //var myMessage = document.getElementById('message');
    //myMessage.textContent(msg); //  innerHTML(msg);
}

function validateInput(value) {
    var result = false;
    if (4 === value.length) {
        setMessage('');
        result = true;
    }
    else {
        setMessage("Guesses must be exactly 4 characters long.")
    }
    return result;
}

function getResults(res) {
    var numGuessed = 0;
    var content = '<div class="row"><span class="col-md-6">' + res + '</span><div class="col-md-6">';
    for(var i = 0; i < res.length; i++) {
        var matchChar = myAnswer.value.indexOf(res.charAt(i))
        if (-1 < matchChar) {
            if (myAnswer.value.charAt(i) === res.charAt(i)) {
                matchChar = i;
            }
        }
        console.log("Match: " + matchChar);
        switch (matchChar) {
            case -1:
            content = content + '<span class="glyphicon glyphicon-remove"></span>';
            break;
            case i:
            numGuessed += 1;
            content = content + '<span class="glyphicon glyphicon-ok"></span>';
            break;
            default:
            content = content + '<span class="glyphicon glyphicon-transfer"></span>';
            break;
        }
    }
    content = content + '</div></div>';
    document.getElementById('results').innerHTML = content;

    if (4 === numGuessed) {
        return true;
    }
    else {
        return false;
    }
}

function showAnswer(res) {
    var result = "failure";
    var myCode = document.getElementById('code')
    var oldClass = myCode.className;
    //myCode.innerHTML = "<strong>" + myAnswer.value + "</strong>";
    myCode.innerHTML = myAnswer.value;
    if (res) {
        result = "success";
    }
    console.log("class to add " + result);
    myCode.classList.add(result);
    console.log("index failure : " + code.className.indexOf(' failure') );
    console.log("index success: " + code.className.indexOf(' success') );
}

function showReplay() {
    var guessDiv = document.getElementById('guessing-div');
    var replayDiv = document.getElementById('replay-div');
    console.log("Element, guessDisplay, replayDisplay: " + document.getElementById('guessing-div') + ", " + guessDiv.style.display + ", " + replayDiv.style.display);
    if ('none' === replayDiv.style.display) {
        guessDiv.style.display = 'none';
        replayDiv.style.display = 'block';
    }
    else {
        guessDiv.style.display = 'block';
        replayDiv.style.display = 'none';         
    }
}