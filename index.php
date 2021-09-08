<!DOCTYPE html>
<html>
<head>
	<title>Imenik | Projekat Imenik</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta charset="utf-8">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
	<link rel="stylesheet" href="style.css">
</head>
<body onload="proveriToken(); ucitaj(); ucitajKontakte();">
	<?php include "include/navbar.php"; ?>
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="jumbotron">
					<h1>Telefonski imenik</h1>
					<p>Sacuvajte sve brojeve telefona</p>
					<p><a class="btn btn-primary btn-lg" href="#" role="button">Opsirnije</a></p>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6">
				<div class="well">
					<form action="" method="GET" id="forma_unos">
						<div class="form-group">
							<label for="imeiprezime">Ime i prezime</label>
							<input type="text" class="form-control" id="imeiprezime" placeholder="Ime i prezime">
						</div>
						<div class="form-group">
							<label for="telefon">Telefon</label>
							<input type="text" class="form-control" id="telefon" placeholder="Telefon">
						</div>
						<button type="button" id="akcijaBtn" onclick="dodajKorisnika();" class="btn btn-block btn-success">Dodaj</button>
					</form>
				</div>
			</div>
			<div class="col-lg-6">
				<div class="well">
					<div class="table-responsive">
						<table class="table">
							<thead>
								<tr>
									<th>Ime i prezime</th>
									<th>Telefon</th>
									<th>Brisanje</th>
									<th>Izmena</th>
								</tr>
							</thead>
							<tbody id="imenik">
								
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" tabindex="-1" id="myModal" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">Informacije o kontaktu</h4>
				</div>
				<div class="modal-body">
					<form action="" method="GET" id="forma_izmena">
						<div class="form-group">
							<label for="imeiprezime_izmena">Ime i prezime</label>
							<input type="text" class="form-control" id="imeiprezime_izmena" placeholder="Ime i prezime" disabled>
						</div>
						<div class="form-group">
							<label for="telefon_izmena">Telefon</label>
							<input type="text" class="form-control" id="telefon_izmena" placeholder="Telefon" disabled>
						</div>
						<div class="form-group">
							<label for="vreme_upisa_izmena">Vreme upisa</label>
							<input type="text" class="form-control" id="vreme_upisa_izmena" placeholder="Vreme upisa..." disabled>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Zatvori</button>
					<button type="button" class="btn btn-primary" onclick="priprema();" id="izmeniDugme">Detalji</button>
				</div>
			</div>
		</div>
	</div><

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
	<script src="index.js"></script>
	<script src="funkcije.js"></script>
</body>
</html>