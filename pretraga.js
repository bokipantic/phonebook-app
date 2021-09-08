var tip = localStorage.getItem("public");
var token = localStorage.getItem("token");

function proveriTipProfila() {
	if (tip == 0) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Vas profil je privatan!',
			text: "Da li zelete da ga promenite u javan?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Da, zelim!',
			cancelButtonText: 'Ne zelim!',
			reverseButtons: true
		}).then((result) => {
			if (result.value) {
				swalWithBootstrapButtons.fire(
					'Uradjeno!',
					'Vas profil je sada javan.',
					'success',
					$.getJSON("https://obrada.in.rs/api/deljenjeKorisnik/" + token + "/" + 1, function (data) {
						if (data.sifra == 0) {
							Swal.fire('Upozorenje', data.poruka, 'error');
							return false;
						}
						localStorage.setItem("public", "1");
						$("#tip_profila").removeClass("alert-danger");
						$("#tip_profila").addClass("alert-success");
						$("#tip_profila").html('<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> <b>JAVAN</b>');
						setTimeout(function () {
							location.reload();
						}, 2000);
					}),
				)
			} else if (
				result.dismiss === Swal.DismissReason.cancel
			) {
				swalWithBootstrapButtons.fire(
					'Vas profil ostaje privatan.',
					'Mozete kasnije promeniti profil u javan.',
					'error',
					setTimeout(function () {
						location.href = "profil.php"
					}, 2000)
				)
			}
		})
	}
}

// DRUGO RESENJE:
// function ucitajKontakte() {
// 	if(tip != 0) {
// 		ucitajLokacijeKorisnika();
// 		$.getJSON("https://obrada.in.rs/api/sviKontakti/"+token, function(data) {
// 			$("table tbody").empty();
// 			$.each(data, function(key, value){
// 				$("table tbody").append("<tr><td>"+value.imeiprezime+"</td><td>"+value.telefon+"</td><td><a onclick='otvoriModal(); ucitajKorisnika("+value.korisnik_id+");' href='#'>"+value.username+"</a></td></tr>");
// 			});
// 		});
// 	}
// }

function ucitajKontakte() {
	if (tip != 0) {
		var korisnik = localStorage.getItem("korisnik");
		if (korisnik == null) {
			ucitajLokacijeKorisnika();
			$.getJSON("https://obrada.in.rs/api/sviKontakti/" + token, function (data) {
				var dt = [];
				$.each(data, function (key, value) {
					var jedan = [value.imeiprezime, value.telefon, "<a onclick='otvoriModal(); ucitajKorisnika(" + value.korisnik_id + ");' href='#'>" + value.username + "</a>"];
					dt.push(jedan);
				});
				$("#tabela").DataTable().destroy();
				$('#tabela').DataTable({
					data: dt,
					"language": {
						"url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Serbian_latin.json"
					},
					"order": [[2, "asc"]],
					// sortira po trecoj koloni u tabeli (Korisnik), rastuci redosled (default redosled je [[0, "asc"]] )
					// "desc" je opadajuci redosled
					responsive: true
				});
			});
		} else {
			ucitajJednuLokaciju(korisnik);
			$.getJSON("https://obrada.in.rs/api/sviKontakti/" + token, function (data) {
				var dt = [];	// prazan niz
				$.each(data, function (key, value) {
					if (value.korisnik_id == korisnik) {
						var jedan = [value.imeiprezime, value.telefon, "<a onclick='otvoriModal(); ucitajKorisnika(" + value.korisnik_id + ");' href='#'>" + value.username + "</a>"];
						dt.push(jedan);
					}
				});
				$("#tabela").DataTable().destroy();
				$('#tabela').DataTable({
					data: dt,
					"language": {
						"url": "https://cdn.datatables.net/plug-ins/1.10.20/i18n/Serbian_latin.json"
					},
					"order": [[2, "asc"]],
					responsive: true
				});
			});
			localStorage.removeItem("korisnik");
		}
	}
}

function pretraga() {
	var brtel = $("#broj_telefona").val();
	if (brtel.length == 0) {
		ucitajKontakte();
	} else {
		var tabela = $(".table tbody tr");
		for (i = 0; i < tabela.length; i++) {
			console.log(brtel);
			console.log(tabela[i].cells[1].innerHTML);
			if (brtel == tabela[i].cells[1].innerHTML) {
				tabela[i].style.display = "table-row";
			} else {
				tabela[i].style.display = "none";
			}
		}
	}

}

function pretraga2(brtel) {
	console.log(brtel);
	if (brtel.length == 0) {
		ucitajKontakte();
	} else {
		if (tip != 0) {
			$.getJSON("https://obrada.in.rs/api/ucitajKontakteSearch/" + token + "/" + brtel, function (data) {
				$("table tbody").empty();
				$.each(data, function (key, value) {
					$("table tbody").append("<tr><td>" + value.imeiprezime + "</td><td>" + value.telefon + "</td><td>" + value.username + "</td></tr>");
				});
			});
		}
	}
}

var mail_adresa;
var ime;

function ucitajKorisnika(id) {
	$.get("https://obrada.in.rs/api/korisnikInfo/" + token + "/" + id, function (data) {
		$("#kontakti").empty();
		mail_adresa = data.korisnik.email;
		ime = data.korisnik.username;

		$("#slika").attr("src", "https://obrada.in.rs/api/" + data.korisnik.img);

		$(".podaci").html('<i>Ime:</i> <b>' + data.korisnik.username + '</b><br><br><i>id_korisnika:</i> <b>' + data.korisnik.id + '</b><br><br><i>Registrovao se:</i> <b>' + data.korisnik.registration_time + '</b><br><br><i>Broj kontakata:</i> <b>' + data.kontakti.length + '</b><br><br><i>Email adresa:</i> <a href="#" onclick="posalji_mail();"><b>' + data.korisnik.email + '</b></a>');

		for (i = 0; i < data.kontakti.length; i++) {
			$("#kontakti").append("<tr><td>" + data.kontakti[i].imeiprezime + "</td><td>" + data.kontakti[i].telefon + "</td></tr>");
		}
	});
}

function otvoriModal() {
	$("#modal_korisnik").modal("show");
}

function posalji_mail() {
	location.href = "mailto:" + mail_adresa + "?Subject=Zdravo " + ime;
}

function ucitajLokacijeKorisnika() {
	$.getJSON("https://obrada.in.rs/api/korisniciInfoLokacija/" + token, function (data) {
		$.each(data, function (key, value) {
			if (value.lat != 0) {
				postaviMarker(value.lat, value.lon, value.id);
			}
		});
	});
}

function ucitajJednuLokaciju(user) {
	deleteMarkers();
	$.getJSON("https://obrada.in.rs/api/korisniciInfoLokacija/" + token, function (data) {
		$.each(data, function (key, value) {
			if (value.lat != 0) {
				if (value.id == user) {
					console.log(value.id);	// nisu brojevi, od 1 do 16
					postaviMarker(value.lat, value.lon, value.id);
					var lokacija = new google.maps.LatLng(value.lat, value.lon);
					map.setCenter(lokacija);
				}
			}
		});
	});
}

var map;
var markers = [];

function initMap() {
	var lokacija = { lat: 44.8154033, lng: 20.2825132 };
	map = new google.maps.Map(document.getElementById('map'), {
		center: lokacija,
		zoom: 8
	});
}

var infowindow;
function postaviMarker(lat, lon, id) {
	var lokacija = new google.maps.LatLng(lat, lon);
	var marker = new google.maps.Marker({
		position: lokacija,
		map: map,
		title: id    // tooltip kad se hover
	});

	marker.addListener('click', function () {
		infowindow = new google.maps.InfoWindow({
			content: '<h4 class="text-center">Korisnik <span id="infowindow_ime"></span></h4><img id="infowindow_slika" src="" style="width: 160px" alt="Slika korisnika"><br><br><div class="text-center"><i><a onclick="otvoriModal(); ucitajKorisnika(' + id + ');">Pogledaj profil</a></i></div>'
		});
		infowindow.open(map, marker);
		popuni_infowindow(id);
	});
	// ovo takodje radi:
	// marker.addListener('click', function() {
	// 	otvoriModal();
	// 	ucitajKorisnika(id);
	// });

	markers.push(marker);
	// console.log(markers);
}

function popuni_infowindow(id) {
	$.get("https://obrada.in.rs/api/korisnikInfo/" + token + "/" + id, function (data) {
		$("#infowindow_ime").html(data.korisnik.username);
		$("#infowindow_slika").attr("src", "https://obrada.in.rs/api/" + data.korisnik.img);
	});
}

function zatvori_infowindow() {
	infowindow.close();
}

function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

function clearMarkers() {
	setMapOnAll(null);
}

function showMarkers() {
	setMapOnAll(map);
}

function deleteMarkers() {
	clearMarkers();
	markers = [];
}

// 	// PIE Chart
// function korisnici_grafikon() {
// 	var podaci_grafikon = [["Korisnik", "Broj kontakata"]];
// 	$.get("https://obrada.in.rs/api/korisniciChart/"+token, function(data) {
// 		for (var i = 0; i < data.length; i++) {
// 			var korisnik = [data[i].username, +data[i].ukupno_kontakata_svih];
// 			podaci_grafikon.push(korisnik);
// 		}
// 	console.log(podaci_grafikon);
// 	nacrtaj_grafikon(podaci_grafikon);
// 	});
// }

// google.charts.load('current', {'packages':['corechart']});
// // google.charts.setOnLoadCallback(nacrtaj_grafikon);

// function nacrtaj_grafikon(podaci_grafikon) {
//       var data = google.visualization.arrayToDataTable(podaci_grafikon);

//         var options = {
//           title: 'Broj kontakata po korisniku',
//           height: 700
//         };

//         var chart = new google.visualization.PieChart(document.getElementById('grafikon'));
//         chart.draw(data, options);
// 	}


//	COMBO Chart
var broj_korisnika;
function korisnici_grafikon() {
	var podaci_grafikon = [["bilo_sta"], ["Korisnik: broj kontakata"]];
	$.get("https://obrada.in.rs/api/korisniciChart/" + token, function (data) {
		broj_korisnika = data.length;
		for (var i = 0; i < data.length; i++) {
			podaci_grafikon[0].push(data[i].username);
			podaci_grafikon[1].push(data[i].ukupno_kontakata_svih * 1);
		}
		console.log(podaci_grafikon);
		nacrtaj_grafikon(podaci_grafikon);
	});
}

google.charts.load('current', { 'packages': ['corechart'] });
// google.charts.setOnLoadCallback(nacrtaj_grafikon);

function nacrtaj_grafikon(podaci_grafikon) {
	var data = google.visualization.arrayToDataTable(podaci_grafikon);
	var options = {
		title: 'Broj kontakata po korisniku',
		vAxis: { title: 'Broj kontakata' },
		height: 650,
		seriesType: 'bars',
		series: { broj_korisnika: { type: 'line' } }
	};

	var grafikon = new google.visualization.ComboChart(document.getElementById('grafikon'));
	grafikon.draw(data, options);

	google.visualization.events.addListener(grafikon, 'select', function () {
		var selectedItem = grafikon.getSelection()[0];
		console.log(selectedItem);
		if (selectedItem) {
			var vrednost = data.getValue(0, selectedItem.column);
			alert("Broj njegovih kontakata je: " + vrednost);
			var user = selectedItem.column;
			console.log(user);		// brojevi od 1 do 16
			localStorage.setItem("korisnik", user);
			location.href = "pretraga.php";
		}
	});
}







