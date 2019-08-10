import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/transfer.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-makepayment',
  templateUrl: './makepayment.component.html',
  styleUrls: ['./makepayment.component.css']
})
export class MakepaymentComponent implements OnInit {

  constructor(private ts:TransferService, private hc:HttpClient) { }

  ngOnInit() {
  }

  payment(data){
    console.log(data)
    data.patientname= this.ts.currentUsername[0].name
    data.paystatus='payed'
  this.hc.post('/patientdashboard/makepayment',data).subscribe(res=>{
    alert(res['message'])
  })
}

}
