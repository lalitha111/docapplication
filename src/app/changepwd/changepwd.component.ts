import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent {

  constructor(private hc:HttpClient,private router:Router) { }


  changepwd(z)
  {
    this.hc.put('/nav/changepwd',z).subscribe((res)=>{
      if(res['message']=='password changed')
      {
        alert(res['message'])
        this.router.navigate(['/nav/login'])
      }
      alert(res['message'])
     
    })
  }

}
