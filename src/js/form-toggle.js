$( "#login" ).click(function() {
	if ($( "#login-form" ).is( ":hidden" )) {
		if ($( "#signup-form" ).not( ":hidden" )) {
		$this.className += " " + activeForm;
    	$( "#signup-form" ).hide();

		$( "#login-form" ).slideDown( "slow", function() {
    		// Animation complete.
		});
	};
	} else {
		$( "#login-form" ).slideUp( "slow", function() {
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
	};
	} else {
		$( "#signup-form" ).slideUp( "slow", function() {
    		// Animation complete.
		});
	}
});