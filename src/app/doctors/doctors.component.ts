import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private hc:HttpClient) { }
list:any;
  ngOnInit() {
    this.hc.get("nav/doctors").subscribe(
      res=>{
        this.list=res['message']
        console.log(this.list)
      })

  }

}
