import { Component, OnInit } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
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
    
    this.paymentService.createToken(this.token).subscribe(response=>{

      let body = response['responseBody'];
      let code = response['statusCode'];
      let responseBody = JSON.parse(body);


      if (code == 200){ 
        let status:string = responseBody.status;

        if (status == "created") {
          this.token = responseBody.id ;
          checkout(this.token);
        }
        else {
         
          
          alert("Error :"+responseBody.status);
          
        }
      }
      else {

        if (code ==404){
          alert("404 Not Found: Check API URL");
        }
        else if(code ==400){
          alert("Status code: "+code+" Error:"+ responseBody.error)
        }
        else if(code ==422){
        var internalError = "";
        let errorData:any = responseBody.error_data;
        Object.keys(errorData).forEach(key => {
          internalError = internalError + "\n["  + errorData[key] + "] "
        });
        
        alert("Status Code: "+code+" \n Error(s):"+internalError);
        
      }
      else {
        alert("Status Code: "+code+" Error: "+responseBody.error);
      }
    }
       
     },
     error=>{
       alert(error.message);
     })
    
    }
}
