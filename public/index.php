<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="vendors/gsap-public/minified/gsap.min.js"></script>
    <link rel="stylesheet" href="vendors/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="resources/css/style.css">
</head>
<body>
    <div id="start_screen" class="">
        <div id="scoreborad" class="container text-center">
          <p id="score"></p>
          <img class="logoimg" src="resources/img/amp_white.png" width="90px">
          <div>
        <button id="start_screen__start_button" class="btn btn-lg btn-primary mt-5 mr-5" onclick="loadQuestions()">NEW GAME</button>
        <button id="start_screen__start_button" class="btn btn-lg btn-primary mt-5 ml-5" onclick="loadQuestions()">NEW GAME</button>
     </div>
     <!-- PHP SCOREBOARD START -->
     <?php
    require "../config/setup.php";
    $q="SELECT * from Gameplay order by score desc";
    ?>
    <table class="table table-striped table-dark mt-5">
  <thead class="thead-dark">
    <tr>
      <th scope="col"><span style='font-size:20px;'>&#129351</span></th>
      <th scope="col">Name</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
      <?php
      $counter = 0;
        foreach ($dbo->query($q) as $nt) {
            $counter ++;
          if ($counter <= 10){
            echo "<tr><th scope='row'>$counter</th><td>$nt[name]</td><td>$nt[score]</td></<tr>";
          }
          else{
            //do nothing
          }
        }
      ?>
    </tbody>
</table>
     <!-- PHP SCOREBOARD END -->


        </div>
    </div>

    <div id="game_screen">
        <div class="card m-5 text-center">
  <div id="card-header" class="card-header">
    <img id="question__logo" src="" alt="">
  </div>
  <div class="card-body">
    <h5 id="question__title" class="card-title">Affordable and clean energy</h5>
    <p id="question__question" class="card-text mt-2">Renewable energy sources are energy sources that do not end in the foreseeable future. One of these sources of energy is the sun which supplies much more energy to the earth than man uses every day. How much more?</p>
    <div id="question__choises" class="mt-2">
<button id="choise_a" type="button" class="btn btn-primary btn-lg btn-block">100 times more</button>
<button id="choise_b" type="button" class="btn btn-primary btn-lg btn-block">1000 times more</button>
<button id="choise_c" type="button" class="btn btn-primary btn-lg btn-block">10 000 times more</button>
    </div>
  </div>
</div>

    </div>

    <script src="resources/js/questions.js"></script>
    <script src="resources/js/game.js"></script>
</body>
</html>