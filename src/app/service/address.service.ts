import { Injectable } from '@angular/core';
import { Address } from '../models/address.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
private fullUrl = environment.apiUrl + "/api/addresses";
  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}/${id}`);
  }
  
  create(idPerson: string, address: Address): Observable<any> {
    const addressModel = {
      street: address.street,
      city: address.city,
      country: address.country,
      state: address.state,
      postalCode: address.postalCode,
    }
    return this.http.post<any>(`${this.fullUrl}/${idPerson}`, addressModel);
  }

  update(idAddress: string, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.fullUrl}/${idAddress}`, address);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.fullUrl}/${id}`);
  }

}