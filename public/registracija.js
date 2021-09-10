var polja = $("input");

function registracija() {
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
	var password = $("#password").val();
	var rpt_password = $("#rpt_password").val();
	if(password != rpt_password){
		Swal.fire('Upozorenje', 'Lozinke se ne poklapaju', 'error');
		return false; 
	}
	var email = $("#email").val();
	if(email.indexOf("@") == -1) {
		Swal.fire('Upozorenje', 'Niste uneli e-mail', 'error');
		return false;
	}
	var username = $("#username").val();
	var korisnik = new Korisnik(username, email, password);
	var json_korisnik = JSON.stringify(korisnik);
	$.post( "https://obrada.in.rs/api/registracija", json_korisnik, function( data ) {
	  	if(data.sifra == 0) {
	  		Swal.fire('Upozorenje', data.poruka, 'error');
	  	} else {
	  		Swal.fire('Info', data.poruka, 'success');
	  		ocisti();
	  	}
	});
}

function Korisnik(username, email, password) {
	this.username = username;
	this.password = password;
	this.email = email;
}

function ocisti() {
	for(i=0; i<polja.length; i++) {
		polja[i].value = "";
	}
}