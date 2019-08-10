import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  currentUsername:any;
  constructor(private hc:HttpClient) { }
setResponse(data):Observable<any>
{
  return this.hc.put('/doctordashboard/viewrequests',data)
}
}
