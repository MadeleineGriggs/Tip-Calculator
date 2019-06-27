var billTotal = 0;
var tipPercentage = 0;
var splitBetween = 0;
var Rounding = 0;

$("#submit-btn").on("click", function() {
    event.preventDefault();
    checkFields();
})

function checkFields() {
    if ($("#bill-total").val() === "") {
        alert("You haven't entered a bill total.")
    } else {
    billTotal = $("#bill-total").val().trim();
    console.log(billTotal);
    }   
}