
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
    if ($("#bill-total").val() === "") {
        alert("You haven't entered a bill total.");
    }
     else if ($('input:radio[name=tip-percentage]:checked').val() == undefined){
        alert("You must select a percentage you would like to tip.");
    }
     else {
         if($('input:radio[name=rounding]:checked').val() == undefined) {

         } else {
             rounding = $('input:radio[name=rounding]:checked').val();
         }
    billTotal = $("#bill-total").val().trim();
    tipPercentage = $('input:radio[name=tip-percentage]:checked').val()
    console.log(billTotal, tipPercentage, rounding);
    }   
}

function calculateTip() {

}