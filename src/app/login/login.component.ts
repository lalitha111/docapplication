import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private hc:HttpClient,private ts:TransferService) { }

  ngOnInit() {
  }
  submit(data) {
    this.hc.post('nav/login/',data).subscribe((res)=>{
    if (res["message"]=='patient name invalid')
    {
      alert('please valid patient name')
    }
    else if(res["message"]=='patient password invalid')
    {
      alert('please enter valid patient password')
    }
    else if(res["message"]=='patient logged in successfully')
    {
      alert('successfully logged in as patient')
      this.ts.currentUsername=res["userdata"]
      localStorage.setItem("idToken",res['token'])
      //console.log(res['token'])
      this.router.navigate(['/patientdashboard/profile']);
    }
    else if (res["message"]=='doctor name invalid')
    {
      alert('please valid doctor name')
    }
    else if(res["message"]=='doctor password invalid')
    {
      alert('please enter valid doctor password')
    }
    else if(res["message"]=='doctor logged in successfully')
    {
      alert('successfully logged in as doctor')
      this.ts.currentUsername=res["userdata"]
      localStorage.setItem("idToken",res['token'])
      //console.log(res['token'])
      this.router.navigate(['/doctordashboard/profile']);

    }

})
}

}
