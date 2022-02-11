function checkout(jsToken) {

    Layer.checkout({
        token: jsToken,
        accesskey: "efcaab50-983b-11eb-9420-c354255a3483",
        theme: {
            // logo : "https://open-logo.png",
            color: "#3d9080",
            error_color: "#ff2b2b"
        }
    },
        function (response) {

            if (response.status == "captured") {

                // response.payment_token_id
                // response.payment_id
                // Please add the redirections or response handling after payment has been captured/failed/cancelled

                window.location.replace("http://localhost:4200");




            } else if (response.status == "created") {

                //window.location.replace("http://localhost:4200");

            } else if (response.status == "pending") {

                //window.location.replace("http://localhost:4200");


            } else if (response.status == "failed") {

                //window.location.replace("http://localhost:4200");


            } else if (response.status == "cancelled") {



            }
        },
        function (err) {
            //integration errors
        }
    )

};