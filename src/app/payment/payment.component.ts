import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Token } from '../token';

declare const checkout:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  token:Token = new Token();
  error:String="";


  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.token.currency="INR";
  }

  pay(){
    this.error="";
    //console.log("Entered On Submit function!");
    
    this.paymentService.createToken(this.token).subscribe(response=>{
      console.log(response);
      if (response["status"] != undefined){ 
        let status:string = response["status"];

        if (response["status"] == "created") {
          this.token = response["id"] ;
          checkout(this.token);
        }
        else {
         
          alert("Er:"+this.error);
          //swalert( response["error"], this.error, "error");
        }
      }
      else {
        var internalError = "";
        let errorData:any = response["error_data"];
        Object.keys(errorData).forEach(key => {
          internalError = internalError + "["  + errorData[key] + "] "
      });
        this.error = internalError;
        //this.error = response["error"] + " - " + response["error_data"] ;
        
        //swalert("Oops!", this.error, "error");
      }
      alert("Error: "+this.error);
    })
    // if (this.error!=""){
    // }
    //checkout("sb_pt_INk91byD5qYj07");
    console.log(this.error);
  }
}
