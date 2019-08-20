import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent {

  constructor(private http:HttpClient ,private router:Router) { }

  
  sendotp(x)
  {
    this.http.post('/nav/resetpwd',x).subscribe((res)=>
    {
      alert(res['message'])
      if(res['message']=="user found")
      {
        this.router.navigate(['../otp'])
      }
      else
      {
        this.router.navigate(['/nav/resetpwd'])
      }
    })
  }

}
