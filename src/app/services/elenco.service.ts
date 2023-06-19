import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Elenco } from '../models/elenco';

const baseUrl = 'http://localhost:8080/api/elenco';
@Injectable({
  providedIn: 'root'
})
export class ElencoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Elenco[]> {
    return this.http.get<Elenco[]>(baseUrl);
  }

  get(id: any): Observable<Elenco[]> {
    return this.http.get<Elenco[]>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Elenco[]> {
    return this.http.get<Elenco[]>(`${baseUrl}?title=${title}`);
  }
}
