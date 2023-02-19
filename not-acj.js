<!DOCTYPE html>
<html>

<head>
  <?!= include('JavaScript'); ?>
  <?!= include('Stylesheet'); ?>
</head>

<body>
  <div class="container">
    <div class="form">
      <form id="myForm" onsubmit="handleFormSubmit(this)">
        <h1>Adaptive Comparison Judgment (ACJ)</h1><br/>
        <h4>Select the Lighter Shade.</h4><br>

        <!-- COLOR TABLE -->
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

        <!-- CURRENT COLOR VALUE SHOWN -->
        <div class="form-group">
          <input type="hidden" id="colorShown_A" name="colorShown_A" value="175" >
          <input type="hidden" id="colorShown_B" name="colorShown_B" value="150" >
        </div>

        <!-- USER INPUT SPACE -->
        <div class="form-group">
          <input type="radio" id="radio_A" name="userAnswer" value="A" > <label class="checkbox" for="A">A</label> <br><br>
          <input type="radio" id="radio_B" name="userAnswer" value="B" > <label class="checkbox" for="B">B</label> <br><br>
          <button type="submit" id="submit">Submit</button>
        </div>

        <!-- <div style="text-align: center; margin-top: 20px;">
          <input type="hidden" id="userAnswer" name="userChoice" value="">
          <button type="submit" name="userAnswer" id="leftButton" value="Left">Left</button>
          <button type="submit" name="userAnswer" id="rightButton" value="Right">Right</button>
        </div> -->

        <p id="counterDisplay">Question 1/11</p>
        <p id="finishedMessage"></p>
      </form>
      <div id="output"></div>
    </div>
  </div>
</body>

</html>
