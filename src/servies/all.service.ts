import { JewerlyComponent } from './../padges/all/jewerly/jewerly.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inter } from '../interfase/inter';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  constructor(private _HttpClient:HttpClient) { }
  getdata():Observable<any>
  {
    return this._HttpClient.get("https://fakestoreapi.com/products")

  }

  mendata():Observable<any>
  {
    return this._HttpClient.get("https://fakestoreapi.com/products/category/men's clothing")
  }

  womandata():Observable<any>{
     return this._HttpClient.get("https://fakestoreapi.com/products/category/women's clothing")
  }
  Jewerly():Observable<any>{
    return this._HttpClient.get("https://fakestoreapi.com/products/category/jewelery")
  }
  electoric():Observable<any>{
    return this._HttpClient.get("https://fakestoreapi.com/products/category/electronics")
  }

 details(id: any): Observable<Inter> {
  return this._HttpClient.get<Inter>(`https://fakestoreapi.com/products/${id}`);
}

}
