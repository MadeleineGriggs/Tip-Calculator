
//Gobal variables for calculating bill. 
var billTotal = 0;
var tipPercentage = 0;
// These two values the user can optionally fill in, since the user may not want to round the tip or split between anyone.
var splitBetween = 0;
var rounding = 0;
// Variables that are used to store results of the calculated tip.
var billWithTip = 0;
var tipTotal = 0;
var tipPerPerson = 0;
var billWithTipPerPerson = 0;


$(document).ready(function(){

//This function allows the page to smoothly scroll to whichever id or class you call it from.
//It is used so if the users has a smaller screen, when they click on "Calculate Tip", their
//screen will scroll down to the results section.
    $.fn.scrollView = function () {
        return this.each(function () {
            $('html, body').animate({
                scrollTop: $(this).offset().top
            }, 1000);
        });
    }


    // When the user clicks to calculate tips, this function runs.
    $("#submit-btn").on("click", function() {
        // prevent button from trying to submit the form to a server.
        event.preventDefault();
        checkFields();
    })


    // This function makes the modal window for alerts hide and show.
    function toggleModal() {
        $(".modal").toggleClass("show-modal")
    }

    // The close button on the modal window toggles the window.
    $(".close-button").on("click", function() {
        toggleModal();
        $("#modal-message").empty();
    })


    function checkFields() {
        // If the bill total area is black, or zero, send an alert to the user to let them know.
        // The bill total field is restricted so no negative numbers or alphabet characters can be entered, only numbers
        // and a single decimal, so we don't check for  negative numbers.
        if ($("#bill-total").val() === "" || $("#bill-total").val() === "0" ) {
            $("#modal-message").text("You haven't entered a bill total.")
            toggleModal();
        }
        else if ($('input:radio[name=tip-percentage]:checked').val() == undefined){
            $("#modal-message").text("You must select a percentage you would like to tip.")
            toggleModal();
        }
        else {

            // If they user doesn't want to round the tip, don't do anything. If they have selected to
            // round the tip, set variable rounding to that value.
            if($('input:radio[name=rounding]:checked', "#my-form").val() == undefined) {

            } else {
                rounding = $('input:radio[name=rounding]:checked', "#my-form").val();
            }
            // Check which tip radio button has been clicked. If it is the custom one, make sure the custom tip field
            // contains a number. If not, send an alert to the user. If so, set the tip percentage. If the user selects
            // a pre-set tip percentage, set tip percentage to that.
            if($('input:radio[name=tip-percentage]:checked').val() == "custom" && $("#custom-tip-field").val() === "") {
                $("#modal-message").text("You have selected 'Custom Tip', but you have not entered the custom tip amount in the custom tip field.")
                toggleModal();
            } else if($('input:radio[name=tip-percentage]:checked', "#my-form").val() == "custom") {
                tipPercentage = parseInt($("#custom-tip-field").val(), 10);
                console.log("Custom Tip Percentage Active.")
            } else {
                tipPercentage = parseInt($('input:radio[name=tip-percentage]:checked').val(), 10);
            }
            // Check if the user has entered a value in the split between field. If they have, then set
            // the "splitBetween" variable to what they've entered.
            if($("#split-between").val() === "") {

            } else {
                splitBetween = parseInt($("#split-between").val(), 10);
            }

        billTotal = parseFloat($("#bill-total").val(), 10);
        calculateTip();
        $(".results").scrollView();
        }   
    }

    // Calculates the tip, bill total with tip, split of the tip per person etc. based on what the user has inputed.
    function calculateTip() {
        if (rounding === 0 && splitBetween === 0) {
            // Not rounding or splitting the bill.
        tipTotal = ((tipPercentage / 100) * billTotal).toFixed(2);
        billWithTip = (parseFloat(tipTotal, 10) + billTotal).toFixed(2);
        if($("#split-title").hasClass("hidden")) {

        } else {
            $("#split-display1").toggleClass("hidden");
            $("#split-display2").toggleClass("hidden");
            $("#split-title").toggleClass("hidden");
        }
        displayTotals();
        } else if (rounding === 0 && splitBetween != 0) {
            // Splitting the bill, but not rounding it.
            tipTotalPreSplit = ((tipPercentage / 100) * billTotal).toFixed(2);
            billWithTip = (parseFloat(tipTotalPreSplit, 10) + billTotal).toFixed(2);
            tipPerPerson = (parseFloat(tipTotalPreSplit, 10) / splitBetween).toFixed(2);
            billWithTipPerPerson = (parseFloat(billWithTip, 10) / splitBetween).toFixed(2);
            tipTotal = parseFloat(tipTotalPreSplit, 10).toFixed(2);
            if($("#split-title").hasClass("hidden")) {
                $("#split-display1").toggleClass("hidden");
                $("#split-display2").toggleClass("hidden");
                $("#split-title").toggleClass("hidden");
            } else {

            }
            displayTotals();
        } else if (rounding != 0 && splitBetween === 0) {
            // Rounding the bill, but not splitting it.
            if (rounding === "1") {
                tipTotalPreRound = ((tipPercentage / 100) * billTotal).toFixed(2);
                billWithTip = Math.round(parseFloat(tipTotalPreRound, 10) + billTotal);
                tipTotal = parseFloat(billWithTip, 10) - billTotal;
            } else {
            tipTotalPreRound = ((tipPercentage / 100) * billTotal).toFixed(2);
            billWithTipPreRound = parseFloat(tipTotalPreRound, 10) + billTotal;
            billWithTip = (Math.ceil(parseFloat(billWithTipPreRound, 10) * rounding) / rounding).toFixed(2);
            tipTotal = (parseFloat(billWithTip, 10) - billTotal).toFixed(2);
            }
            if($("#split-title").hasClass("hidden")) {

            } else {
                $("#split-display1").toggleClass("hidden");
                $("#split-display2").toggleClass("hidden");
                $("#split-title").toggleClass("hidden");
            }
            displayTotals();
        } else if (rounding !=0 && splitBetween != 0) {
            //Rounding and splitting the bill.
            console.log("Rounding and splitting...")
            tipTotalPreRound = ((tipPercentage / 100) * billTotal).toFixed(2);
            billWithTipPreRound = parseFloat(tipTotalPreRound, 10) + billTotal;
            billWithTip = (Math.ceil(parseFloat(billWithTipPreRound, 10) * rounding) / rounding).toFixed(2);
            tipTotal = (parseFloat(billWithTip, 10) - billTotal).toFixed(2);
            tipPerPerson = (parseFloat(tipTotal, 10) / splitBetween).toFixed(2);
            billWithTipPerPerson = (parseInt(billWithTip) / splitBetween).toFixed(2);
            if($("#split-title").hasClass("hidden")) {
                $("#split-display1").toggleClass("hidden");
                $("#split-display2").toggleClass("hidden");
                $("#split-title").toggleClass("hidden");
            } else {

            }
            displayTotals();
        }
    }

    //After the totals have been calculated, this function runs to display the totals on the page.
    function displayTotals() {
        $("#tip-percent-selected").text(tipPercentage + "%");
        $("#bill-no-tip").text("$ " + billTotal);
        $("#tip-total").text("$ " + tipTotal);
        $("#bill-with-tip-total").text("$ " + billWithTip);
        $("#tip-person-total").text("$ " + tipPerPerson + " per person");
        $("#bill-with-tip-per-person").text("$ " + billWithTipPerPerson + " per person");

    // Return global variables to their default.
        billTotal = 0;
        tipPercentage = 0;
        splitBetween = 0;
        rounding = 0;
        billWithTip = 0;
        tipTotal = 0;
        tipPerPerson = 0;
        billWithTipPerPerson = 0;
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
});