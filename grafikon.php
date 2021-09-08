<!DOCTYPE html>
<html>
<head>
  <title>Grafikon sa kontaktima | Projekat Imenik</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
</head>
<body onload="proveriToken(); ucitaj(); proveriTipProfila(); korisnici_grafikon();">
  <?php include "include/navbar.php"; ?>
  <div class="container">
    <div>
      <ul class="nav nav-tabs">
        <li role="presentation"><a href="pretraga.php">Pretraga kontakata</a></li>
        <li role="presentation" class="active"><a href="grafikon.php">Grafikon sa kontaktima</a></li>
      </ul>
    </div>
    <br><br>
    <div class="row">
      <div class="col-lg-12">
        <div>
          <h2 class="text-center">Korisnici i njihovi kontakti</h2>
          <div id="grafikon"></div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
  <script src="https://www.gstatic.com/charts/loader.js"></script>
  
  <script src="pretraga.js"></script>
  <script src="funkcije.js"></script>
  
</body>
</html>