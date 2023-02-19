<script>
  var i = 0;
  var counter;

  var numbers_A = [0, 25, 50, 75, 100, 125, 175, 200, 225, 250]; //150 omitted because default value
  var numbers_B = [];
  var shuffledNumbers_A = shuffle(numbers_A);

  var userChoice;

  function changeColor() {
    if (i < shuffledNumbers_A.length) {
      const inputCompare = {value: shuffledNumbers_A[i]};
      const index = findInsertionIndex(numbers_B, inputCompare);
      numbers_B.splice(index, 0, inputCompare);

      var colorNew_A = "rgb(" + shuffledNumbers_A[i] + ", " + shuffledNumbers_A[i] + ", " + shuffledNumbers_A[i] + ")";
      var colorNew_B = "rgb(" + numbers_B[i] + ", " + numbers_B[i] + ", " + numbers_B[i] + ")";
      document.getElementById("color_A_Cell").style.background = colorNew_A;
      document.getElementById("color_B_Cell").style.background = colorNew_B;
      counter = i + 2;
      counterDisplay.innerHTML = "Question " + counter + "/11";
      i++;
    }
    else {
      const result = numbers_B.map((x) => x.value); // RESULT IS AN ARRAY TO STORE NEW ORDER
      document.getElementById("sorting-result").textContent = result; // DISPLAY THE RESULT ORDERED ARRAY TO THE USER

      finishedMessage.innerHTML = "You have Completed the ACJ Assessment. You will be now redirected to the <b>CTJ Assessment</b>.";
      counterDisplay.innerHTML = "Question XX/11";
      radio_A.disabled = true;
      radio_B.disabled = true;
      submit.disabled = true;
    }
  }

  function findInsertionIndex(arr, item) { // arr IS NUMBER_B and item IS input_Compare
    let low = 0;
    let high = arr.length; // EQUIVALENT TO number_B.length

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (userChoice == 'A') {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
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
    document.getElementById("colorShown_B").value = numbers_B[i];
    userChoice = document.getElementByName("userAnswer");
    changeColor();
  }

















<!-- MAXIMUM LIELIHOOD ESTIMATION -->

// Define the log-likelihood function for a normal distribution
function logLikelihood(params, data) {
  const [mu, sigma] = params;
  const N = data.length;
  const sum = data.reduce((acc, x) => acc + (x - mu) ** 2, 0);
  const ll = -N / 2 * Math.log(2 * Math.PI * sigma ** 2) - sum / (2 * sigma ** 2);
  return ll;
}

// Define the maximum likelihood estimation function
function maximumLikelihood(data, logLikelihood, initialParams, tolerance, maxIterations) {
  let bestParams = initialParams;
  let bestLL = logLikelihood(bestParams, data);
  let iteration = 0;
  let delta = Infinity;
  
  while (iteration < maxIterations && delta > tolerance) {
    // Generate a new set of parameters and evaluate the log-likelihood
    const newParams = bestParams.map(p => p + (Math.random() - 0.5));
    const newLL = logLikelihood(newParams, data);
    
    // Update the best parameters if the log-likelihood is higher
    if (newLL > bestLL) {
      bestParams = newParams;
      bestLL = newLL;
      delta = Math.abs(newLL - bestLL);
    }
    
    iteration++;
  }
  
  return bestParams;
}








</script>
