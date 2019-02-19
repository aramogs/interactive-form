///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Ready Function:
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $("#name").focus();
    $("#other-title").hide();
    $("#colors-js-puns").hide();
  //  $('#credit-card').hide();
    $('select option[value="credit card"]').attr("selected",true);
    $("p").hide();
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Tile: If title equals other show other-title
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#title').click(function (e) {
    //e.preventDefault();
    let $otherJob = e.currentTarget.value;
    if ($otherJob === "other") {
        $('#other-title').slideDown();
    } else {
        $('#other-title').slideUp();
    }


});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Design: Depending on the design option shows or hides colors
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#color').append('<option value="please" selected="selected">Please select a T-shirt theme</option>');
$('#design').on('change', function () {
   
    $("#colors-js-puns").slideDown(1000);
    if (this.value == 'Select Theme') {
        $("#colors-js-puns").slideUp(1000);
    } else if (this.value == "js puns") {
        $("#color option:not(:contains(♥))").css("display", "block");
        $("#color option:contains(♥)").css("display", "none");
        $('#color').val('please');
    } else if (this.value == "heart js") {
        $("#color option:not(:contains(♥))").css("display", "none");
        $("#color option:contains(♥)").css("display", "block");
        $('#color').val('please');
    }

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Register for activities: 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const $totalHTML = $('<div class="total"><h5></h5></div>');
let total = 0;

let activities = [
    { name: "all", price: "200" },
    { name: "js-frameworks", price: "100", conflict: "express" },
    { name: "js-libs", price: "100", conflict: "node" },
    { name: "express", price: "100", conflict: "js-frameworks" },
    { name: "node", price: "100", conflict: "js-libs" },
    { name: "build-tools", price: "100" },
    { name: "npm", price: "100" }

];
$('input[type="checkbox"]').click(function (e) {
    $('.activities').append($totalHTML);
    let value = e.currentTarget.checked;
    let valueName = e.currentTarget.name;
    if (value != false && valueName == 'all') {
        total += 200;
        $('.total h5').text('Total: $' + total);
    } else if (value != true && valueName == 'all') {
        total -= 200;
        $('.total h5').text('Total: $' + total);
    } else if (value != false && valueName != 'all') {
        total += 100;
        $('.total h5').text('Total: $' + total);
        toggleActivitys(valueName, value);
    } else if (value == false && valueName != 'all') {
        total -= 100;
        $('.total h5').text('Total: $' + total);
        toggleActivitys(valueName, value);
    }
});
function toggleActivitys(valueName, value) {
    if (value) {
        for (i = 0; i < activities.length; i++) {
            if (valueName == activities[i].name) {
                $conflict = $('.activities input[name=' + activities[i].conflict + ']');
                $conflict.parent().css('text-decoration', 'line-through');
                $conflict.prop('disabled', true);
            }
        }

    } else {
        for (i = 0; i < activities.length; i++) {
            if (valueName == activities[i].name) {
                $conflict = $('.activities input[name=' + activities[i].conflict + ']');
                $conflict.parent().css('text-decoration', 'none');
                $conflict.prop('disabled', false);
            }
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Payment: Depending on the selection show or hide information
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


$('#payment').on('change', function (event) {
    let $payInfo = event.currentTarget.value;
    
    switch ($payInfo) {
        case 'credit card':
            $('p:first').slideUp('1000');
            $('p:last').slideUp('1000');
            $('#credit-card').slideDown(1000);
            $('html, body').animate({
                scrollTop: $(document).height()
            }, 1000);
            $("#cc-num").focus();
            break;
        case 'paypal':
            $('p:first').slideDown('1000');
            $('p:last').slideUp('1000');
            $('#credit-card').slideUp(1000);
            break;
        case 'bitcoin':
            $('p:first').slideUp('1000');
            $('p:last').slideDown('1000');
            $('#credit-card').slideUp(1000);
            break;
        default:
            $('p:first').slideUp('1000');
            $('p:last').slideUp('1000');
            $('#credit-card').slideUp(1000);
            break;
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Register Listener
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let  inputName =    $('#name');
let  inputEmail =   $('#mail');
let  inputOther =   $('#other-title');
let  inputcc =      $('#cc-num');
let  inputZip=      $('#zip');
let  inputcvv=      $('#cvv');

const RegExname = /^[a-z ,.'-]+$/i
const RegExemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const RegExcc = /^[0-9]{13,16}$/;
const RegExzip = /^[0-9]{5}$/;
const RegExcvv = /^[0-9]{3}$/;

let inputNameVal = inputName.attr('name');
let inputEmailVal = inputEmail.attr('name');
let inputOtherVal = inputOther.attr('name');
let inputccVal = inputcc.attr('name');
let inputZipVal =   inputZip.attr('name');
let inputcvvVal=    inputcvv.attr('name');
let validated = true;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


inputName.bind('input', () => {isValidInput(inputName, RegExname, inputName.val(), 'name')});
inputEmail.bind('input', () => {isValidInput(inputEmail, RegExemail, inputEmail.val(), 'email')});

function isValidInput($input, regEx, val, message='') {
	if(regEx.test(val)) {
		$input.removeClass('warning');	
		if($input.prev().filter('.warning').length !== 0) {
			$input.prev().remove();
		}		
		return true;
	}
	else {
		$input.addClass('warning');
		if(val === '') {
			message = ('Please enter your ').concat(message);
		}
		else {
			message = 'Your ' + message + ' is formatted incorrectly'
		}
		if($input.prev().filter('.warning').length === 0)
			$input.before('<i class="warning">'+ message +'</i>');
		else {
			$input.prev().filter('.warning').text(message);
		}
		return  false;
	}
}

function CheckActivities(){
    const $activities = $('.activities input');
	const $errorHTML = $('<i class="warning">Please select at least one activity.</i>');
	
	// If there is at least 1 checked activity, returns true
	if($activities.filter(':checked').length) {
		$('.activities > .warning').remove();
		return true;
	}
	else {
		if($('.activities > .warning').length === 0)
			$('.activities legend').after($errorHTML);
		return  false;
	}
}

function CheckInputs(){
	if($('#payment option').filter(':selected').val() === 'credit card') {

        if(!isValidInput(inputName, RegExname, inputName.val(), 'name')){validated = false}        
        if(!isValidInput(inputEmail, RegExemail, inputEmail.val(), 'email')){validated=false}
		if(!isValidInput(inputcc, RegExcc, inputcc.val(), 'card number')){validated = false}  		
		if(!isValidInput(inputZip, RegExzip, inputZip.val(), 'zip code')){validated = false}  
		if(!isValidInput(inputcvv, RegExcvv, inputcvv.val(), 'CVV')){validated = false}  
    }
    return validated;
}
console.log(validated);
$('button[type="submit"]').on('click', function (event) {  
    event.preventDefault();
    CheckActivities();
    if(CheckInputs()){
        console.log("listo");
        location.reload();
    }else{

        CheckInputs();
    }
});