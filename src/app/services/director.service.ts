import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/director';

const baseUrl = 'http://localhost:8080/api/director';

@Injectable({
  providedIn: 'root'
})

export class DirectorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Director[]> {
    return this.http.get<Director[]>(baseUrl);
  }

  get(id: any): Observable<Director> {
    return this.http.get<Director>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Director> {
    return this.http.get<Director>(`${baseUrl}?title=${title}`);
  }
}

