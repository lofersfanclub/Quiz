<!DOCTYPE html>
<html>
  <head>
    <title>Add to scoreboard</title>
    <script src="../vendors/gsap-public/minified/gsap.min.js"></script>
    <link rel="stylesheet" href="../vendors/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../resources/css/style.css">

    <script>
      var finalScore = window.location.hash.substring(1);

      function getScore(){
        document.getElementById("fScore").innerHTML = Number(finalScore);
        document.getElementById("form_score").value = Number(finalScore);
      }
    </script>

  </head>
  <body onload="getScore()">
<div class="card m-5">
	<div class="card-header">
		Final score: <span id="fScore"></span>
	</div>
	<div class="card-body">
		<form method="post">
			<div class="formatting form-group">
				<label for="motivationInput">What will you do to save the planet? Give us you motivation:</label> 
				<textarea class="form-control" id="motivationInputTextarea" rows="3"></textarea>
			</div>
			<div class="formatting form-group">
				<label for="nameInput">Name</label> <input class="form-control" id="nameInput" name="name" placeholder="Name" type="text">
			</div>
			<div class="formatting form-group">
				<label for="emailInput">Email address</label> <input aria-describedby="emailHelp" class="form-control" id="emailInput" name="email" placeholder="Enter email" type="email"> <small class="form-text text-muted" id="emailHelp">We'll never share your email with anyone else.</small>
			</div><input id="form_score" name="score" type="hidden"> <button class="btn btn-primary btn-lg btn-block" name="submit" type="submit" value="Submit">Submit</button>
		</form>
	</div>
</div>

      <?php
      require "../../config/setup.php"; // connection string is here

      if(isset($_POST["submit"])){
            $sql = "INSERT INTO Gameplay (name, score, email)
            VALUES ('".$_POST["name"]."','".$_POST["score"]."','".$_POST["email"]."')";
            if ($dbo->query($sql)) {
              echo "<script type='text/javascript'>window.location.replace('../index.php');</script>";
            }
            else{
              //error
              echo "<script type= 'text/javascript'>alert('Error: Data not added to database.');</script>";
            }

            $dbo = null;
        }
      ?>
  </body>
</html>
