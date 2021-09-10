var polja = $("#forma_unos input");
var token = localStorage.getItem("token");
var imeiprezime_baza;
var telefon_baza;

function dodajKorisnika() {
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
	var imeiprezime = $("#imeiprezime").val();
	var telefon = $("#telefon").val();
	if (telefon[0] != 0 || telefon[1] != 6) {
		Swal.fire('Upozorenje', 'Greska prilikom unosa telefona<br>Prva cifra mora biti 0, a druga 6', 'error');
		return false;
	} 
	if (telefon.length != 9 && telefon.length != 10) {
		Swal.fire('Upozorenje', 'Greska prilikom unosa telefona<br>Telefon moze imati 9 ili 10 cifara', 'error');
		return false;
	}
	if (isNaN(telefon) == true) {
		Swal.fire('Upozorenje', 'Greska prilikom unosa telefona<br>Telefon moze sadrzati samo cifre od 0 do 9', 'error');
		return false;
	}
	var kontakt = new Kontakt(imeiprezime, telefon);
	var json_kontakt = JSON.stringify(kontakt);
	$.post( "https://obrada.in.rs/api/dodajKontakt/"+token, json_kontakt, function( data ) {
		console.log(data);
		if(data.sifra == 0) {
			Swal.fire('Upozorenje', data.poruka, 'error');
		} else {
			Swal.fire('Info', data.poruka, 'success');
			ocisti();
			ucitajKontakte();
		}
	});

}

function Kontakt(imeiprezime, telefon) {
	this.imeiprezime = imeiprezime;
	this.telefon = telefon;
}

function ocisti() {
	for(i=0; i<polja.length; i++) {
		polja[i].value = "";
	}
}

function ucitajKontakte() {
	$.get( "https://obrada.in.rs/api/ucitajKontakte/"+token, function( data ) {
		$("#imenik").empty();
		if(data.length == 0) {
			$("#imenik").append("<tr><td colspan='4' class='text-center'>Nema rezultata</td></tr>");
		} else {
			$.each( data, function( key, value ) {
				$("#imenik").append("<tr><td>"+value.imeiprezime+"</td><td>"+value.telefon+"</td><td><button class='btn btn-xs btn-danger' onclick='obrisiKontakt("+value.id+");'>Obrisi</button></td><td><button class='btn btn-xs btn-primary' onclick='spremiIzmenu("+value.id+");'>Izmeni</button></td></tr>");
			});
		}

	});
}

function obrisiKontakt(id) {
	$.get( "https://obrada.in.rs/api/obrisiKontakt/"+token+"/"+id, function( data ) {
		if(data.sifra == 0) {
			Swal.fire('Upozorenje', data.poruka, 'error');
		} else {
			Swal.fire('Info', data.poruka, 'success');
			ucitajKontakte();
		}
	});
}

var kontakt_izmena_id;
function spremiIzmenu(id) {
	$("#myModal").modal("show");
	$.get( "https://obrada.in.rs/api/kontaktInfo/"+token+"/"+id, function( data ) {
		$("#imeiprezime_izmena").val(data.imeiprezime);
		$("#telefon_izmena").val(data.telefon);
		imeiprezime_baza = data.imeiprezime;
		telefon_baza = data.telefon;
		$("#vreme_upisa_izmena").val(data.vreme_upisa);
		kontakt_izmena_id = data.id;
	});
}

function priprema() {
	$("#imeiprezime_izmena").removeAttr("disabled");
	$("#telefon_izmena").removeAttr("disabled");
	$("#izmeniDugme").html("Izmeni");
	$("#izmeniDugme").attr("onclick", "izmeniKontakt("+kontakt_izmena_id+");");
}

function vracanje() {
	$("#imeiprezime_izmena").attr("disabled", "disabled");
	$("#telefon_izmena").attr("disabled", "disabled");
	$("#izmeniDugme").html("Detalji");
	$("#izmeniDugme").attr("onclick", "priprema();");
}

function izmeniKontakt(id) {
	var polja = $("#forma_izmena input");
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
	var imeiprezime_izmena = $("#imeiprezime_izmena").val();
	var telefon_izmena = $("#telefon_izmena").val();
	if (telefon_izmena[0] != 0 || telefon_izmena[1] != 6) {
		Swal.fire('Upozorenje', 'Greska prilikom unosa telefona<br>Prva cifra mora biti 0, a druga 6', 'error');
		return false;
	} 
	if (telefon_izmena.length != 9 && telefon_izmena.length != 10) {
		Swal.fire('Upozorenje', 'Greska prilikom unosa telefona<br>Telefon moze imati 9 ili 10 cifara', 'error');
		return false;
	}
	if (isNaN(telefon_izmena) == true) {
		Swal.fire('Upozorenje', 'Greska prilikom unosa telefona<br>Telefon moze sadrzati samo cifre od 0 do 9', 'error');
		return false;
	}
	if (imeiprezime_baza == imeiprezime_izmena && telefon_baza == telefon_izmena) {
		Swal.fire('Obavestenje', 'Niste izmenili kontakt', 'info');
		$("#myModal").modal("hide");
		vracanje();
	}
	else {
		var kontakt = new Kontakt($("#imeiprezime_izmena").val(), $("#telefon_izmena").val());
		var json_kontakt = JSON.stringify(kontakt);
		$.post( "https://obrada.in.rs/api/izmeniKontakt/"+token+"/"+id, json_kontakt, function( data ) {
			if(data.sifra == 0) {
				Swal.fire('Upozorenje', data.poruka, 'error');
			} else {
				$("#myModal").modal("hide");
				Swal.fire('Info', data.poruka, 'success');
				ucitajKontakte();
				vracanje();
			}
		});
	}
}