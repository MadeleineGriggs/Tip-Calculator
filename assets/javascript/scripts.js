
//Gobal variables for calculating bill. 
var billTotal = 0;
var tipPercentage = 0;
// These two values are optional, since the user may not want to round the tip or split between anyone.
var splitBetween = 0;
var rounding = 0;

$("#submit-btn").on("click", function() {
    // prevent button from trying to submit the form to a server.
    event.preventDefault();
    checkFields();
})


function checkFields() {
    // If the bill total area is black, or zero, send an alert to the user to let them know.
    // The bill total field is restricted so no negative numbers or alphabet characters can be entered, only numbers
    // and a single decimal, so we don't check for  negative numbers.
    if ($("#bill-total").val() === "" || $("#bill-total").val() === "0" ) {
        alert("You haven't entered a bill total.");
    }
     else if ($('input:radio[name=tip-percentage]:checked').val() == undefined){
        alert("You must select a percentage you would like to tip.");
    }
     else {

        // If they user doesn't want to round the tip, don't do anything. If they have selected to
        // round the tip, set variable rounding to that value.
         if($('input:radio[name=rounding]:checked').val() == undefined) {

         } else {
             rounding = $('input:radio[name=rounding]:checked').val();
         }
        // Check which tip radio button has been clicked. If it is the custom one, make sure the custom tip field
        // contains a number. If not, send an alert to the user. If so, set the tip percentage. If the user selects
        // a pre-set tip percentage, set tip percentage to that.
         if($('input:radio[name=tip-percentage]:checked').val() == "custom" && $("#custom-tip-field").val() === "") {
             alert("You have selected 'Custom Tip', but you have not entered the custom tip amount in the custom tip field.");
         } else if($('input:radio[name=tip-percentage]:checked').val() == "custom") {
             tipPercentage = $("#custom-tip-field").val()
         } else {
             tipPercentage = $('input:radio[name=tip-percentage]:checked').val()
        }
        // Check if the user has entered a value in the split between field. If they have, then set
        // the "splitBetween" variable to what they've entered.
        if($("#split-between").val() === "") {

        } else {
            splitBetween = $("#split-between").val();
        }

    billTotal = $("#bill-total").val().trim();
    console.log("Bill Total is: " + billTotal, "Tip Percentage is: " + tipPercentage, "Rounding value is: " + rounding, "Split is: " + splitBetween);
    calculateTip();
    }   
}

function calculateTip() {

}

function displayTotals() {
    $("#bill-no-tip").text(billTotal);
}

// Function allows only numbers, backspace, delete, and one decimal to be added to the 
// fields with the class "numbers-decimals-only"
$(".numbers-decimals-only").keypress(function (e) {
    if(e.which == 46){
        if($(this).val().indexOf('.') != -1) {
            return false;
        }
    }

    if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});

// Function allows only numbers to be added to the fields with the class "numbers-only".
$(".numbers-only").keypress(function( event ){
    var key = event.which;

    if( ! ( key >= 48 && key <= 57 ) )
        event.preventDefault();
});