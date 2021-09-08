var token = localStorage.getItem("token");
var public_info;		// moglo je ovo isto sa var public bez uvodjenja var public_info
var polja = $("form input");
var image = "";

function ucitajKorisnika() {
	$.getJSON("https://obrada.in.rs/api/korisnikInfo/"+token, function(data) {
		console.log(data);
		$("#username_info").val(data[0].username);
		$("#id_info").val(data[0].id);
		$("#email_info").val(data[0].email);
		$("#broj_kontakata").val(data.ukupno_kontakata);
		if(data[0].img.length == 0) {
			$("#profilna_slika").attr("src", "user.jpg");
		} else {
			$("#profilna_slika").attr("src", "https://obrada.in.rs/api/"+data[0].img);
		}
		var public = parseInt(data[0].public);
		public_info = public;
		if(public == 0) {
			$("#tip_profila").addClass("alert-danger");
			$("#tip_profila").removeClass("alert-success");
			$("#tip_profila").html('<span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span> <b>PRIVATAN</b>');
		} else {
			$("#tip_profila").removeClass("alert-danger");
			$("#tip_profila").addClass("alert-success");
			$("#tip_profila").html('<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> <b>JAVAN</b>');
		}
		if(data[0].lat !=0) {
			postaviMarker(data[0].lat, data[0].lon);
		}
		// moraju brojevi da se ubace u grafikon
		var pita_podaci = [
			["Korisnik", "Broj kontakata"], 
			["Moji", +data.ukupno_kontakata], 
			["Ostali", data.ukupno_kontakata_svih - data.ukupno_kontakata]
		];
		// kad se radi matematicka operacija, rezultat je broj tako da mogu, a i ne moraju plusevi ispred
		console.log(pita_podaci);
		napravi_grafikon(pita_podaci);
	});
}

function promeniTip() {
	if(public_info == 0) {
		var prosledi = 1;
	} else {
		var prosledi = 0;
	}
	$.getJSON("https://obrada.in.rs/api/deljenjeKorisnik/"+token+"/"+prosledi, function(data) {
		if(data.sifra==0) {
			Swal.fire('Upozorenje', data.poruka, 'error');
			return false;
		}
		localStorage.setItem("public", prosledi);
		ucitajKorisnika();
	});
}

function izmeniLozinku() {
	var greska = 0;
	for(i=0; i<polja.length; i++) {
		var par = polja[i].parentNode;
		if(polja[i].value.length==0){
			greska++;
			par.classList.add("has-error");
		} else {
			par.classList.remove("has-error");
		}
	}
	if(greska>0) {
		return false;
	}
	var password = $("#nova_lozinka").val();
	var rpt_password = $("#potvrdi_lozinku").val();
	if(password != rpt_password){
		Swal.fire('Upozorenje', 'Lozinke se ne poklapaju', 'error');
		return false; 
	}
	var stara_lozinka = $("#stara_lozinka").val();
	var lozinka = new Lozinka(stara_lozinka, password);
	var json_lozinka = JSON.stringify(lozinka);
	$.post( "https://obrada.in.rs/api/izmeniLozinku/"+token, json_lozinka, function( data ) {
		if(data.sifra == 0) {
			Swal.fire('Upozorenje', data.poruka, 'error');
		} else {
			Swal.fire('Info', data.poruka, 'success');
			ocisti();
		}
	});
}

function Lozinka(password, rpt_password) {
	this.staralozinka = password;
	this.novalozinka = rpt_password;
}

function ocisti() {
	for(i=0; i<polja.length; i++) {
		polja[i].value = "";
	}
}

function otvoriModalZaSliku() {
	$("#myModal").modal("show");
}

function readImage(input) {
	var reader = new FileReader();
	reader.onload = function(e) {
		$("#profilna_slika_modal").attr("src", e.target.result);
		image = e.target.result;
	}
	reader.readAsDataURL(input.files[0]);
}

function Slika(slika) {
	this.image = slika;
}

function izmeniSliku() {
	if(image.length == 0) {
		Swal.fire('Upozorenje', 'Prvo izaberite sliku', 'error');
	} else {
		var slika = new Slika(image);
		var json_slika = JSON.stringify(slika);
		$.post( "https://obrada.in.rs/api/dodajSliku/"+token, json_slika, function( data ) {
			if(data.sifra == 0) {
				Swal.fire('Upozorenje', data.poruka, 'error');
			} else {
				Swal.fire('Info', data.poruka, 'success');
				ucitajKorisnika();
				$("#myModal").modal("hide");
				$("#profilna_slika_modal").attr("src", "user.jpg");
				$("#file_input").val("");
				image = "";
			}
		});
	}
}

// JS ZA MAPU:
var map;
var marker;

function initMap() {
	var lokacija = {lat: 44.8154033, lng: 20.2825132};
	map = new google.maps.Map(document.getElementById('map'), {
		center: lokacija,
		zoom: 8
	});
	 google.maps.event.addListener(map, 'click', function(event){
	 	console.log(event.latLng.lat(), event.latLng.lng());
	 	postaviMarker(event.latLng.lat(), event.latLng.lng(), 1);
	 });
}

function postaviCentar(lat, lon) {
	var lokacija = new google.maps.LatLng(lat, lon);
	map.setCenter(lokacija);
}

function postaviMarker(lat, lon, listener=0) {
	var lokacija = new google.maps.LatLng(lat, lon);
	if(marker == null) {
		marker = new google.maps.Marker({
          position: lokacija,
          map: map
        });
	} else {
		marker.setPosition(lokacija);
	}
	if(listener!=0) {
		izmeniLokaciju(lat, lon);
	} else {
		postaviCentar(lat,lon);
	}
}

function Lokacija (lat, lon) {
	this.lat = lat;
	this.lon = lon;
}

function izmeniLokaciju(lat, lon) {
	var lokacija = new Lokacija(lat, lon);
	var json_lokacija = JSON.stringify(lokacija);
	$.post( "https://obrada.in.rs/api/dodajLokaciju/"+token, json_lokacija, function( data ) {
		if(data.sifra == 0) {
			Swal.fire('Upozorenje', data.poruka, 'error');
		} else {
			Swal.fire('Info', data.poruka, 'success');
		}
	});

}

// JS za Chart:
google.charts.load('current', {'packages':['corechart']});
      // google.charts.setOnLoadCallback(napravi_grafikon);
      function napravi_grafikon(pita_podaci) {
        var data = google.visualization.arrayToDataTable(pita_podaci);
        var options = {
          title: 'Odnos kontakata',
          is3D: true
        };
        var grafikon = new google.visualization.PieChart(document.getElementById('pita_grafikon'));
        grafikon.draw(data, options);   
        // EVENT SELECT:
        google.visualization.events.addListener(grafikon, 'select', function() {
        	var selectedItem = grafikon.getSelection()[0];
        	console.log(selectedItem);			// objekat {row: 0 ili 1, column: null}
        	if(selectedItem) {
        		var vrednost = data.getValue(selectedItem.row, 1);
        		alert("Izabrali ste: " + vrednost);
        	}
        });
      }