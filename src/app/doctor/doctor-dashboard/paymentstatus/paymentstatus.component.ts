import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferService } from 'src/app/transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentstatus',
  templateUrl: './paymentstatus.component.html',
  styleUrls: ['./paymentstatus.component.css']
})
export class PaymentstatusComponent implements OnInit {
data:any;
  constructor(private hc:HttpClient, private ts:TransferService, private router:Router) { }
paymentData:any;
  ngOnInit() {
    this.hc.get(`/doctordashboard/paymentstatus/${this.ts.currentUsername[0].name}`).subscribe(res=>{
      
      if(res['message']=="unauthorized access")
      {
        alert(res['message']);
        console.log(res['message'])
        this.router.navigate(['/nav/login'])
      }
      else{
        this.paymentData=res['message']
      }
    })
    
  }

}
