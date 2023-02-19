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














































<!-- MAXIMUM LIELIHOOD ESTIMATION -->

// Define the log-likelihood function for a normal distribution
// The function will take two arguments: the observation (color) and the parameters (mean and standard deviation). The function will return the likelihood of the observation given the parameters.

function likelihood(observation, mean, sd) {
  var exponent = -(Math.pow(observation - mean, 2) / (2 * Math.pow(sd, 2)));
  var denom = Math.sqrt(2 * Math.PI) * sd;
  return Math.exp(exponent) / denom;
}

// Define the maximum likelihood estimation function
//Next, we will define a function that will calculate the likelihood of all possible pairs of colors given the set of parameters. This function will take an array of colors and the parameters (mean and standard deviation) as arguments. The function will return an array of arrays, where each subarray contains two colors and the likelihood of the first color being preferred over the second color.

function pairwise_likelihood(colors, mean, sd) {
  var pairwise_likelihoods = [];
  for (var i = 0; i < colors.length; i++) {
    for (var j = i + 1; j < colors.length; j++) {
      var likelihood1 = likelihood(colors[i], mean, sd);
      var likelihood2 = likelihood(colors[j], mean, sd);
      pairwise_likelihoods.push([colors[i], colors[j], likelihood1 / (likelihood1 + likelihood2)]);
    }
  }
  return pairwise_likelihoods;
}

//Now, we can use the pairwise likelihoods to estimate the mean and standard deviation using maximum likelihood estimation. We will use the numeric library for this purpose.

function estimate_mean_sd(colors) {
  var pairwise_likelihoods = pairwise_likelihood(colors, 0, 1);
  var log_likelihood_function = function (params) {
    var log_likelihood = 0;
    for (var i = 0; i < pairwise_likelihoods.length; i++) {
      var likelihood = likelihood(pairwise_likelihoods[i][0], params[0], params[1]);
      var likelihood2 = likelihood(pairwise_likelihoods[i][1], params[0], params[1]);
      log_likelihood += Math.log(likelihood / (likelihood + likelihood2));
    }
    return -log_likelihood;
  };
  var result = numeric.uncmin(log_likelihood_function, [0, 1]);
  return {mean: result.solution[0], sd: result.solution[1]};
}

//Finally, we can use the estimated mean and standard deviation to rank the colors using their mean values.

function rank_colors(colors) {
  var {mean, sd} = estimate_mean_sd(colors);
  var ranked_colors = colors.sort(function (a, b) {
    return likelihood(b, mean, sd) - likelihood(a, mean, sd);
  });
  return ranked_colors;
  document.getElementById("ranked_colors").innerHTML = ranked_colors;
}

//To use the functions, we can create an array of colors and call the rank_colors function.
var colors = [0.1, 0.3, 0.4, 0.6, 0.7, 0.8];
var ranked_colors = rank_colors(colors);
console.log(ranked_colors);


</script>
