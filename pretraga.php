<!DOCTYPE html>
<html>
<head>
	<title>Pretraga svih kontakata | Projekat Imenik</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">

	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="style.css">
</head>
<body onload="proveriToken(); ucitaj(); proveriTipProfila(); ucitajKontakte();">
	<?php include "include/navbar.php"; ?>
	<div class="container">
		<div>
			<ul class="nav nav-tabs">
				<li role="presentation" class="active"><a href="pretraga.php">Pretraga kontakata</a></li>
				<li role="presentation"><a href="grafikon.php">Grafikon sa kontaktima</a></li>
			</ul>
		</div>
		<br>
		<div class="row">
			<div class="col-lg-12">
				<div id="map"></div>
				<br>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<div class="row">
					<div class="col-lg-9">
						<div class="form-group">
							<input onkeyup="pretraga2(this.value);" type="text" class="form-control" id="broj_telefona" placeholder="Unesite broj telefona...">
						</div>
					</div>
					<div class="col-lg-3">
						<button onclick="pretraga();" class="btn btn-primary btn-block">Pretrazi</button>
					</div>
				</div>				
				<table class="table" id="tabela">
					<thead>
						<tr>
							<th>Ime i prezime</th>
							<th>Telefon</th>
							<th>Korisnik</th>
						</tr>
					</thead>
					<tbody id="imenik"></tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="modal fade" tabindex="-1" id="modal_korisnik" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h3 class="modal-title text-center">Informacije o korisniku</h3>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-lg-6">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h3 class="panel-title text-center">Slika korisnika</h3> <br>
								</div>
								<div class="panel-body">
									<img id="slika" src="" class="img-responsive" alt="Slika korisnika">
								</div>	
							</div>
						</div>
						<div class="col-lg-6">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h3 class="panel-title text-center">Opsti podaci</h3>
								</div>
								<div class="panel-body podaci"></div>	
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h3 class="panel-title text-center">Kontakti korisnika</h3>
								</div>
								<div class="panel-body">
									<table class="table">
										<thead>
											<tr>
												<th>Ime i prezime</th>
												<th>Telefon</th>
											</tr>
										</thead>
										<tbody id="kontakti"></tbody>
									</table>
								</div>	
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button onclick="zatvori_infowindow();" type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
					<!-- <button type="button" id="izmeniDugme" class="btn btn-primary">Izmeni</button> -->
				</div>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtcimz2iBQOvo0vDeMwntyYwbFBiEIp9c&callback=initMap"
	async defer></script>
	<script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
	
	<script src="pretraga.js"></script>
	<script src="funkcije.js"></script>
</body>
</html>