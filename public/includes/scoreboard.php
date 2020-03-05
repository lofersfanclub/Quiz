<!DOCTYPE html>
<html>
  <head>
    <title>Scoreboard</title>
  </head>
  <body>
    <?php
    require "setup.php";
    $q="SELECT * from Gameplay order by score desc";
    ?>
    <ol>
      <?php
        foreach ($dbo->query($q) as $nt) {
          echo "<li>$nt[name] - $nt[score] </li>";
        }
      ?>
    </ol>
            <button id="start_screen__start_button" onclick="loadQuestions()">NEW GAME</button>
  </body>
  </html>
