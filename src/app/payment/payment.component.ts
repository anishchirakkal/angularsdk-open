import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Token } from '../token';
import { ToastrService } from 'ngx-toastr';

declare const checkout: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  token: Token = new Token();
  error: String = '';
  tokenId: String;

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.token.currency = 'INR';
  }

  pay() {
    this.paymentService.createToken(this.token).subscribe(
      (response) => {
        let body = response['responseBody'];
        let code = response['statusCode'];
        let responseBody = JSON.parse(body);

        if (code == 200) {
          let status: string = responseBody.status;

          if (status == 'created') {
            this.tokenId = responseBody.id;
            checkout(this.tokenId);
          } else {
            this.toastr.error(responseBody.status, 'Error code: ' + code);
          }
        } else {
          if (code == 404) {
            this.toastr.error(
              '404 Not Found: Check API URL',
              'Error code: ' + code
            );
          } else if (code == 400) {
            this.toastr.error(responseBody.error, 'Error code: ' + code);
          } else if (code == 422) {
            var internalError = '';
            let errorData: any = responseBody.error_data;
            Object.keys(errorData).forEach((key) => {
              internalError = internalError + '\n[' + errorData[key] + '] ';
            });

            this.toastr.error(internalError, 'Error code: ' + code);
          } else {
            this.toastr.error(responseBody.error, 'Error code: ' + code);
          }
        }
      },
      (error) => {
        this.toastr.error(error.message, 'Error: ');
      }
    );
  }
}
