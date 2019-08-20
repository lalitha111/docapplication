import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.component.html',
  styleUrls: ['./paymenthistory.component.css']
})
export class PaymenthistoryComponent implements OnInit {
  
  constructor(private ts:TransferService, private hc:HttpClient, private router:Router) { }
  paymentData:any;
  ngOnInit() {
    this.hc.get(`/patientdashboard/paymenthistory/${this.ts.currentUsername[0].name}`).subscribe(res=>{
      
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
