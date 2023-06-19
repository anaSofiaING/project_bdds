import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena, ResenaFull } from '../models/resena';


const baseUrl = 'http://localhost:8080/api/resena';

@Injectable({
  providedIn: 'root'
})
export class ResenaService {


  constructor(private http: HttpClient) { }

  getAll(): Observable<Resena[]> {
    return this.http.get<Resena[]>(baseUrl);
  }

  get(id: any): Observable<Resena[]> {
    return this.http.get<Resena[]>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<ResenaFull[]> {
    return this.http.get<ResenaFull[]>(`${baseUrl}?title=${title}`);
  }
}

