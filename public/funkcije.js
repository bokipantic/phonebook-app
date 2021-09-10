function logout() {
	localStorage.removeItem("token");
	localStorage.removeItem("username");
	location.href = "login.html";
}

function proveriToken() {
	var token = localStorage.getItem("token");
	if(token==null) {
		logout();
	} else {
		$.get( "https://obrada.in.rs/api/proveriToken/"+token, function( data ) {
		 	if(data.sifra == 0) {
		 		logout();
		 	}
		});
	}
}

function ucitaj() {
	$("#username").html(localStorage.getItem("username"));
}

setInterval(function() {
	proveriToken();
}, 10000);

