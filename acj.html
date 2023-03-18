<!DOCTYPE html>
<html>

<head>
  <base target="_top">
</head>

<body>
  <!-- FOR DEBUGGING -->
  <div id="result"></div>


  <h1>Adaptive Comparison Judgment<br> (RELEASE CANDIDATE. ONLY 4 QUESTIONS)</h1><br/>
  <p id="instruction">Loading…<br></p><br/>

  <!-- Color Table -->
  <form id="myForm" onsubmit="handleFormSubmit(this)">
    <table id="colorTable">
      <tr id="colorExplanationRow">
        <th>Color A</th>
        <th>Color B</th>
      </tr>
      <tr id="colorRow">
        <td id="color_A_Cell"> </td>
        <td id="color_B_Cell"> </td>
      </tr>
    </table><br>

    <!-- Current color value shown -->
    <div class="form-group">
      <input type="hidden" id="colorShown_A" name="colorShown_A" value="150" >
      <input type="hidden" id="colorShown_B" name="colorShown_B" value="150" >
    </div>

    <!-- User input space -->
    <div class="form-group">
      <input type="radio" id="radio_A" name="userAnswer" value="A" disabled> <label>A</label> <br><br>
      <input type="radio" id="radio_B" name="userAnswer" value="B" disabled> <label>B</label> <br><br>
      <button type="submit" id="submit" class="button" disa>Submit</button>
      <p id="counterDisplay">Questions Answered: 0 out of 45</p>
    </div>
  </form>
</body>











<script>
  // Redirect prevention when user clicks "submit"
  function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
        event.preventDefault();
      });
    }
  } window.addEventListener('load', preventFormSubmit);
  
  let colorValues = []; // Initialize an empty array to store the data
  var i = 0;
  
  function getColorValuesFromServer(){
    google.script.run.withSuccessHandler(data => {
      // Store the data in the array
      colorValues = data;
      // Call the new function to assign two values from the array to a variable
      changeColorValues();
    }).withFailureHandler(er => {
      // Set the innerHTML property of the 'result' element to display the error message
      document.getElementById("result").innerHTML = "Error Occured";
    }).getColorValues()
  }

  function changeColorValues() {
    // Randomize array's row between 0 and 10 without having the same values for a and b
    do {
      var a = Math.floor(Math.random() * 10);
      var b = Math.floor(Math.random() * 10);
    } while (a === b);
    // Assign the first two values from the 'colorValues' array to a variable
    let color1 = colorValues[a];
    let color2 = colorValues[b];
    // DEBUGGING
    // document.getElementById("result").innerHTML = `Color 1: ${color1}<br>Color 2: ${color2}`;
    
    // Show instruction (Initial message was "Loading…")
    document.getElementById("instruction").innerHTML = "Please select the <b>Lighter Shade</b>.";
    submit.disabled = false;
    radio_A.disabled = false;
    radio_B.disabled = false;
    // Color for A and B
    var colorNew_A = "rgb(" + color1 + ", " + color1 + ", " + color1 + ")";
    var colorNew_B = "rgb(" + color2 + ", " + color2 + ", " + color2 + ")";
    document.getElementById("color_A_Cell").style.background = colorNew_A;
    document.getElementById("color_B_Cell").style.background = colorNew_B;
    // Get current color data for Google Sheet
    document.getElementById("colorShown_A").value = color1;
    document.getElementById("colorShown_B").value = color2; 
    //-------
  }

  // Call the function when the page loads
  window.onload = getColorValuesFromServer;

  var counter = 1;
  function handleFormSubmit(formObject){
    if (document.getElementById('radio_A').checked || document.getElementById('radio_B').checked) {
      if (i < 3) { //44
        google.script.run.processForm(formObject);
        // Reset the radio button selection made by the user
        document.getElementById("myForm").reset();
        // Call the changeColorValues function
        changeColorValues();
        counter = i + 1;
        counterDisplay.innerHTML = "Questions Answered: " + counter + " out of 45";
        i++;
      }
      else {
        google.script.run.processForm(formObject);
        getUserSelectedColorValuesFromServer().then(userSelectedColorValues => {
          var array = userSelectedColorValues;
          var subArray = [array];
          var userSelectedData = rankOrderAll(subArray);
          google.script.run.withSuccessHandler(() => {
            // Do something after showRankOrder has completed
          }).showRankOrder(userSelectedData);
        });
        counterDisplay.innerHTML = "You will be now redirected to the <b>CTJ Assessment</b>.";
        submit.disabled = true;
        setTimeout(function() {
          window.open("https://script.google.com/macros/s/AKfycbx_gws5D3fnU4Mhg-OkSiyNICEmZqyhDP04W_7TZHE0WlBYSr6OQCHD887hc9M3NxjKqw/exec");
        }, 3000); // 3 seconds
      }
    }
    else {
      alert("Please select an answer.");
    }
  }
  
  function getUserSelectedColorValuesFromServer() {
    return new Promise((resolve, reject) => {
      google.script.run.withSuccessHandler(data => {
        // Resolve the promise with the data
        resolve(data);
      }).getUserColorValues();
    });
  }


  // MAXIMUM LIKELIHOOD ESTIMATION //
  // Calculate the likelihood of observing the data given the probability of a specific value in the user's choice
  function likelihood(data, p) {
    var likelihood = 1;
    for (var i = 0; i < data.length; i++) {
      if (data[i] === p) {
        likelihood *= 1 / 256;
      }
      else {
        likelihood *= 255 / 256;
      }
    }
    return likelihood;
  }

  // Function to find the MLE of the probability of all values on user's choice for each data set
  function mleMultipleData(dataSets) {
    var mleResults = [];
    for (var i = 0; i < dataSets.length; i++) {
      var data = dataSets[i];
      var mleValues = [];
      for (var p = 1; p <= 255; p++) {
        var likelihood_p = likelihood(data, p);
        mleValues.push({ value: p, likelihood: likelihood_p });
      }
      mleValues.sort(function (a, b) { return b.likelihood - a.likelihood; });
      mleResults.push(mleValues);
    }
    return mleResults;
  }

  // Function to rank the order of the MLE for all data sets
  function rankOrderAll(data) {
    // Calculate the likelihoods for all values of user's choice across all data sets
    const allLikelihoods = mleMultipleData(data);

    // Combine the likelihoods for each value of user's choice across all data sets
    const combinedLikelihoods = {};
    for (const likelihoods of allLikelihoods) {
      for (const { value, likelihood } of likelihoods) {
        if (combinedLikelihoods[value]) {
          combinedLikelihoods[value] *= likelihood;
        } 
        else {
          combinedLikelihoods[value] = likelihood;
        }
      }
    }

    // Sort the values of user's choice by their combined likelihoods, in descending order
    const sortedValues = Object.keys(combinedLikelihoods).sort((a, b) => combinedLikelihoods[b] - combinedLikelihoods[a]);

    // Create a Set of all values present in the data array, including "0"
    const dataSetValues = new Set(data.flat().concat([0]));

    // Filter the sortedValues array to only include values that are present in the dataSetValues Set
    const filteredValues = sortedValues.filter(value => dataSetValues.has(parseInt(value)));

    // Return the filtered values as an array of integers
    return filteredValues.map(value => parseInt(value));
  }


  function rankOrderAll(data) {
    // Calculate the likelihoods for all values of the dice across all data sets
    const allLikelihoods = mleMultipleData(data);

    // Combine the likelihoods for each value of the dice across all data sets
    const combinedLikelihoods = {};
    for (const likelihoods of allLikelihoods) {
      for (const { value, likelihood } of likelihoods) {
        if (combinedLikelihoods[value]) {
          combinedLikelihoods[value] *= likelihood;
        } 
        else {
          combinedLikelihoods[value] = likelihood;
        }
      }
    }

    // Sort the values of the dice by their combined likelihoods, in descending order
    const sortedValues = Object.keys(combinedLikelihoods).sort((a, b) => combinedLikelihoods[b] - combinedLikelihoods[a]);

    // Create a Set of all values present in the data array, including "0"
    const dataSetValues = new Set(data.flat().concat([0]));

    // Filter the sortedValues array to only include values that are present in the dataSetValues Set
    const filteredValues = sortedValues.filter(value => dataSetValues.has(parseInt(value)));

    // Return the filtered values as an array of integers
    return filteredValues.map(value => parseInt(value));
  }
</script>




















<style>
  * {
    font-family: Arial;
    text-align: center;
  }

  table {
    width: 70%;
    border-collapse: collapse;
    margin: 0 auto;
  }

  #color_A_Cell {
    width: 100px;
    height: 100px;
    background-color: rgb(0, 0, 0);
    margin: 10px;
    border: 1px solid black;
  }

  #color_B_Cell {
    width: 100px;
    height: 100px;
    background-color: rgb(0, 0, 0);
    margin: 10px;
    border: 1px solid black;
  }

  .button {
    display: inline-block;
    background-color: #0569b9;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #448fcb;
  }

  .button:active {
    background-color: #0569b9;
    transform: translateY(1px);
  }

  button:disabled {
    background-color: gray;
    color: white;
    cursor: not-allowed;
    pointer-events: none;
  }

  //DARKMODE
  body {
    background-color: white;
    color: black;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: black;
      color: #d6d6d6;
    }
</style>

</html>
