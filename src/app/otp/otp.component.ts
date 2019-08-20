import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor(private hc:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  submitotp(y)
  {
    this.hc.post('/nav/verifyotp',y).subscribe((res)=>
    {
      alert(res['message'])
      if(res['message']=="verifiedOTP")
      {
        this.router.navigate(['/nav/changepwd'])
      }
      else
      {
        this.router.navigate(['/nav/otp'])
      }
    })
  }

}
