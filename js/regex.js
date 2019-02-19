function isValidInput($input, regEx, val, message='') {

	if(regEx.test(val)) {
		// Remove possible error class and error message when test passes
		$input.removeClass('error');
		
		if($input.prev().filter('.error-message').length !== 0) {
			$input.prev().remove();
		}
		
		return true;
	}
	else {
		$input.addClass('error');
		
		// Check for empty versus malformatted input, display appropriate message
		if(val === '') {
			message = ('Please enter your ').concat(message);
		}
		else {
			message = 'Your ' + message + ' is formatted incorrectly'
		}

		// Check for existence of error message, add html to document, or change text
		if($input.prev().filter('.error-message').length === 0)
			$input.before('<p class="error-message">'+ message +'</p>');
		else {
			$input.prev().filter('.error-message').text(message);
		}

		return false;
	}

}

// EFFECTS: Checks for at least one selected (checked) activity, returns false otherwise
//          Handles error message adding/removing depending on check
function isAttendingActivity() {

	const $activities = $('.activities input');
	const $errorHTML = $('<i class="error-message">Please select at least one activity.</i>');
	if($activities.filter(':checked').length) {
		$('.activities > .error-message').remove();
		return true;
	}
	else {
		if($('.activities > .error-message').length === 0)
			$('.activities legend').after($errorHTML);
		return false;
	}
}

// EFFECTS: Call this function in order to add real-time form validation
//          Currently only supports Name and Email input fields
function realtimeValidation() {

	const nameRegEx = /[a-zA-Z]{1,}/;

	const $emailInput = $('#mail');
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// These listeners bind to input events, and check the validity of each input
	$nameInput.bind('input', () => {isValidInput($nameInput, nameRegEx, $nameInput.val(), 'name')});
	$emailInput.bind('input', () => {isValidInput($emailInput, emailRegEx, $emailInput.val(), 'email')});
}


// EFFECTS: Calls input validation functions and returns true if all pass
//          If one or more validation functions fail, the function returns false
function validateForm() {

	const nameRegEx = /[a-zA-Z]{1,}/;
	const nameVal = $nameInput.val();

	const $emailInput = $('#mail');
	const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const emailVal = $emailInput.val();
	
	const $ccInput = $('#cc-num');
	const ccRegEx = /^[0-9]{13,16}$/;
	const ccVal = $ccInput.val();
	
	const $zipInput = $('#zip');
	const zipRegEx = /^[0-9]{5}$/;
	const zipVal = $zipInput.val();
	
	const $cvvInput = $('#cvv');
	const cvvRegEx = /^[0-9]{3}$/;
	const cvvVal = $cvvInput.val();

	let isValid = true;

	// Each condition calls valid check. If the check returns false, we flip the isValid flag
	if(!isValidInput($nameInput, nameRegEx, nameVal, 'name')) {
		isValid = false;
	}
	if(!isValidInput($emailInput, emailRegEx, emailVal, 'email')) {
		isValid = false;
	}
	if(!isAttendingActivity()) {
		isValid = false;
	}

	// Only check for credit card validation if "Credit Card" payment type is selected
	if($('#payment option').filter(':selected').val() === 'credit card') {
		if(!isValidInput($ccInput, ccRegEx, ccVal, 'card number')) {
			isValid = false;
		}
		if(!isValidInput($zipInput, zipRegEx, zipVal, 'zip code')) {
			isValid = false;
		}
		if(!isValidInput($cvvInput, cvvRegEx, cvvVal, 'CVV')) {
			isValid = false;
		}
	}

	// Return the flag, will be false if any of the tests failed
	return isValid;
}

// Call the function for enabling real-time validation on the form
realtimeValidation();

// Listener on form submission, validates form fields, otherwise, prevents submission
$('form').submit((ev) => {
	if(validateForm()) {
		return;
	}
	else {
		ev.preventDefault();
	}
});