import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.css']
})
export class MakepaymentComponent implements OnInit {

  constructor(private ts:TransferService, private hc:HttpClient, private router:Router) { }

  ngOnInit() {
  }

  payment(data){
    console.log(data)
    data.patientname= this.ts.currentUsername[0].name
    data.paystatus='paid'
  this.hc.post('/patientdashboard/makepayment',data).subscribe(res=>{
    if(res['message']=="session expired")
      {
        alert(res['message']);
        console.log(res['message'])
        this.router.navigate(['/nav/login'])
      }
      else{
        alert(res['message']);
        this.router.navigate(['../patientdashboard/paymenthistory']);
      }
    
  })
}

}
