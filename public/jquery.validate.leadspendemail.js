/*!
 * jQuery Validate LeadSpend Email Validation config and auto-start
 * jquery.validate.leadspendemail-0.3.js
 *
 * Original author: @this-sam, @leadspend
 * Kudos to: @jtnotat
 * Licensed under the MIT license
 *
 * Requires jQuery
 * Requires jQuery Validate
 * Requires jQuery LeadSpendEmail
 */

( function( $ ){
    jQuery.validator.addMethod(
        "leadSpendEmail",
        // Set jQuery Validate for correct validity depending on LeadSpend result
        function( emailValue, element ) {
            result = $( element ).siblings( ".leadSpendEmail-result" ).val();
            switch ( result ){
                case "illegitimate":
                case "unreachable":
                case "undeliverable":
                case "pending":	// email result has not yet been returned.
                    return false;

                case "unknown":
                case "disposable":
                case "verified":
                case "error": // only enabled in debug mode
                    return true;
            }
            return true; // always return a value, even if code is crazy
        },
        // Set jQuery Validate messages for various validity results
        function( value, field ){	// function to determine error message
            result = $( field ).siblings( ".leadSpendEmail-result" ).val();
            switch ( result ){
                case "illegitimate":
                case "unreachable":
                case "undeliverable":
                    return "Sorry, this email address appears to be " + result + ".";

                case "pending":
                    return "Verifying email address...";
            }
            return "";
        } );

    // automatically initialize this on any forms with leadSpendEmail.  Defaults can still be updated after this.
    $( document ).ready( function(){
        $( ".leadSpendEmail" ).each(function(){
            var emailField = $(this);
            emailField.closest( "form" ).validate({
                invalidHandler : function( event, validator ) {
                    if($( emailField ).siblings( ".leadSpendEmail-result" ).val() == "pending"){
                        return true;
                    };
                },
            });
        });

        $( ".leadSpendEmail-result" ).on( "change", function( event ){
            if($(this).val() != "pending"){
                $( event.target.form ).find( ".leadSpendEmail" ).trigger( "focusout" );
            }
        });
    });
}( jQuery ) );
