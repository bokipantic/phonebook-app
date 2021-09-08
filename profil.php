<!DOCTYPE html>
<html>
<head>
	<title>Profil | Projekat Imenik</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
	<link rel="stylesheet" href="style.css">
</head>
<body onload="ucitaj(); ucitajKorisnika();">
	<?php include "include/navbar.php"; ?>
	
	<div class="container">
		<div class="row">
			<div class="col-lg-4">
				<div class="well">
					<img id="profilna_slika" src="" class="img-responsive" alt="Slika korisnika">
					<div class="text-center">
						<small><a id="linkZaSliku" onclick="otvoriModalZaSliku();">Zameni sliku</a></small>
					</div>
					<div class="form-group">
					    <label for="id_info">ID</label>
					    <input type="text" class="form-control" id="id_info" placeholder="ID..." disabled>
					</div>
					<div class="form-group">
					    <label for="username_info">Username</label>
					    <input type="text" class="form-control" id="username_info" placeholder="Username..." disabled>
					</div>
					<div class="form-group">
					    <label for="email_info">E-mail</label>
					    <input type="text" class="form-control" id="email_info" placeholder="Email..." disabled>
					</div>
					<div class="form-group">
					    <label for="broj_kontakata">Broj kontakata</label>
					    <input type="text" class="form-control" id="broj_kontakata" placeholder="Broj kontakata..." disabled>
					</div>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="well">
					<h2 class="text-center">Izmena lozinke</h2>
					<form action="">
						<div class="form-group">
						    <label for="stara_lozinka">Stara lozinka</label>
						    <input type="password" class="form-control" id="stara_lozinka" placeholder="Stara lozinka...">
						</div>
						<div class="form-group">
						    <label for="nova_lozinka">Nova lozinka</label>
						    <input type="password" class="form-control" id="nova_lozinka" placeholder="Nova lozinka...">
						</div>
						<div class="form-group">
						    <label for="potvrdi_lozinku">Potvrdi lozinku</label>
						    <input type="password" class="form-control" id="potvrdi_lozinku" placeholder="Potvrdi lozinku...">
						</div>
						<button onclick="izmeniLozinku();" type="button" class="btn btn-primary btn-block"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Promeni lozinku</button>
					</form>
				</div>
				<div class="well" id="tip_profila_holder">
					<h2 class="text-center">Tip profila</h2>
					<div id="tip_profila" class="alert alert-danger text-center"></div>
					<button onclick="promeniTip();" class="btn btn-primary btn-block"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> Promeni tip</button>
				</div>
			</div>
			<div class="col-lg-4">
				<div>
					<h2 class="text-center">Moj udeo u kontaktima</h2>
					<div id="pita_grafikon"></div>
				</div>
				<br>
				<div id="map"></div>
			</div>
		</div>
	</div>

	<div class="modal fade" tabindex="-1" id="myModal" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Zameni sliku</h4>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-lg-6">
							<h2>Zameni profilnu sliku</h2>
							<input id="file_input" type="file" onchange="readImage(this);">
						</div>
						<div class="col-lg-6">
							<img id="profilna_slika_modal" src="user.jpg" class="img-responsive" alt="">
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
					<button type="button" id="izmeniDugme" onclick="izmeniSliku();" class="btn btn-primary">Zameni</button>
				</div>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtcimz2iBQOvo0vDeMwntyYwbFBiEIp9c&callback=initMap"
    async defer></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

	<script src="profil.js"></script>
	<script src="funkcije.js"></script>
</body>
</html>