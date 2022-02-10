function checkout(jsToken){

Layer.checkout({
    token: jsToken,
    accesskey: "efcaab50-983b-11eb-9420-c354255a3483",
    theme: {
        // logo : "https://open-logo.png",
        color: "#3d9080",
        error_color : "#ff2b2b"
      }
},
function(response) {

    if (response.status == "captured") {
                    
       // response.payment_token_id
       // response.payment_id

    } else if (response.status == "created") {


    } else if (response.status == "pending") {


    } else if (response.status == "failed") {


    } else if (response.status == "cancelled") {

        console.log("The payment is cancelled");

    }
},
function(err) {
    //integration errors
}
)

};