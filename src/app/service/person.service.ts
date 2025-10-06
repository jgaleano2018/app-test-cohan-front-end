import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
private fullUrl = environment.apiUrl + "/api/persons";
  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}${id}`);
  }
  
  create(person: Person): Observable<any> {
    return this.http.post<any>(`${this.fullUrl}`, person);
  }

  update(idPerson: string, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.fullUrl}/${idPerson}`, person);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.fullUrl}/${id}`);
  }

}