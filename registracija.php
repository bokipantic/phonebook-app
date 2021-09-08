<!DOCTYPE html>
<html>
<head>
	<title>Registracija | Projekat Imenik</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
	<link rel="stylesheet" href="style.css">	
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-lg-4"></div>
			<div class="col-lg-4">
				<div class="well" id="forma-registracija">
					<h1 class="text-center"><u>Registracija</u></h1>
					<div class="form-group">
					    <label for="username">Username</label>
					    <input type="text" class="form-control" id="username" placeholder="Username...">
					</div>
					<div class="form-group">
					    <label for="email">Email</label>
					    <input type="text" class="form-control" id="email" placeholder="Email...">
					</div>
					<div class="form-group">
					    <label for="password">Password</label>
					    <input type="password" class="form-control" id="password" placeholder="Password...">
					</div>
					<div class="form-group">
					    <label for="rpt_password">Repeat password</label>
					    <input type="password" class="form-control" id="rpt_password" placeholder="Repeat password...">
					</div>
					<button id="btnRegistracija" class="btn btn-primary btn-block" onclick="registracija();"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Registruj se</button>
					<div class="text-center">
						<small>Imate nalog? <a href="login.html"> Ulogujte se!</a></small>
					</div>
				</div>
			</div>
			<div class="col-lg-4"></div>
		</div>
	</div>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	<script src="registracija.js"></script>
</body>
</html>