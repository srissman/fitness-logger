$( "#login" ).click(function() {
	if ($( "#login-form" ).is( ":hidden" )) {
		if ($( "#signup-form" ).not( ":hidden" )) {
    	$( "#signup-form" ).hide();

		$( "#login-form" ).slideDown( "slow", function() {
    		// Animation complete.
		});
		$( "#signup" ).removeClass("activeForm");
		$( "#login" ).addClass("activeForm");
	};
	} else {
		$( "#login" ).slideUp( "slow", function() {
    		// Animation complete.
		});
	}
});

$( "#signup" ).click(function() {
	if ($( "#signup-form" ).is( ":hidden" )) {
		if ($( "#login-form" ).not( ":hidden" )) {

    	$( "#login-form" ).hide();	

		$( "#signup-form" ).slideDown( "slow", function() {
    		// Animation complete.
		});
		$( "#signup" ).addClass("activeForm");
		$( "#login" ).removeClass("activeForm");
	};
	} else {
		$( "#signup-form" ).slideUp( "slow", function() {
    		// Animation complete.
		});
	}
});