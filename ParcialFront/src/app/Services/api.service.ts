import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public api:HttpClient) { }

  apiUrl = "https://localhost:7290/api/";

  public async Get (gatewayController: string){
    var respo:any;
    await this.api.get(this.apiUrl+gatewayController).toPromise().then((res=>{
      console.log(res);
    })
    )
  }
}
