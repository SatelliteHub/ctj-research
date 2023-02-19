<script>
  var i = 0;
  var counter;

  var numbers_A = [0, 25, 50, 75, 100, 125, 175, 200, 225, 250]; //150 omitted because default value, so # of questions = 11
  var numbers_B = [0, 25, 50, 75, 100, 125, 150, 200, 225, 250]; //150 omitted because default value, so # of questions = 11
  var shuffledNumbers_A = shuffle(numbers_A);
  var shuffledNumbers_B = shuffle(numbers_B);

  function changeColor() {
    if (i < shuffledNumbers_A.length) {
      var colorNew_A = "rgb(" + shuffledNumbers_A[i] + ", " + shuffledNumbers_A[i] + ", " + shuffledNumbers_A[i] + ")";
      var colorNew_B = "rgb(" + shuffledNumbers_B[i] + ", " + shuffledNumbers_B[i] + ", " + shuffledNumbers_B[i] + ")";
      document.getElementById("color_A_Cell").style.background = colorNew_A;
      document.getElementById("color_B_Cell").style.background = colorNew_B;
      counter = i + 2;
      counterDisplay.innerHTML = "Question " + counter + "/11";
      i++;
    }
    else {
      finishedMessage.innerHTML = "You have Completed the ACJ Assessment. You will be now redirected to the <b>CTJ Assessment</b>.";
      counterDisplay.innerHTML = "Question 11/11";
      radio_A.disabled = true;
      radio_B.disabled = true;
      submit.disabled = true;
    }
  }


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }


  // PREVENT THE REDIRECTION AFTER CLICKING SUBMIT
  function preventFormSubmit(){
    var forms=document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++){
      forms[i].addEventListener('submit',function(event){
        event.preventDefault();
      });
    }
  }
  window.addEventListener('load',preventFormSubmit);


  //FUNCTION WHEN USER CLICKS SUBMIT BUTTON
  function handleFormSubmit(formObject){
    google.script.run.processForm(formObject);
    document.getElementById("myForm").reset(); //Reset the radio button selection made by the user
    document.getElementById("colorShown_A").value = shuffledNumbers_A[i];
    document.getElementById("colorShown_B").value = shuffledNumbers_B[i];
    changeColor();
  }
</script>
