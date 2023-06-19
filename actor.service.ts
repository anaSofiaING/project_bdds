import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from './src/app/models/actor';

const baseUrl = 'http://localhost:8080/api/actor';

@Injectable({
  providedIn: 'root'
})

export class ActorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Actor[]> {
    return this.http.get<Actor[]>(baseUrl);
  }

  get(id: any): Observable<Actor> {
    return this.http.get<Actor>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Actor[]> {
    return this.http.get<Actor[]>(`${baseUrl}?title=${title}`);
  }
}