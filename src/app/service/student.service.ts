import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
private fullUrl = environment.apiUrl + "/api/professors";
  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.fullUrl}${id}`);
  }
  
  create(student: Student): Observable<any> {
    return this.http.post<any>(`${this.fullUrl}`, student);
  }

  update(idStudent: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.fullUrl}/${idStudent}`, student);
  }

  delete(idStudent: string): Observable<any> {
    return this.http.delete(`${this.fullUrl}/${idStudent}`);
  }

}