import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Publicacion} from "../../models/publicacion";

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

basePath = 'http://localhost:3000/Publicacion';

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

constructor(private http: HttpClient) { }

handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.log(`An error occurred: ${error.error.message} `);
  } 
  else {
    console.error(
      `Backend returned code ${error.status}, body was: ${error.error}`
    );
  }
  
  return throwError('Something happened with request, please try again later');
}

// Create Publicacion
create(item: any): Observable<Publicacion> {
  return this.http.post<Publicacion>(this.basePath, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get Publicacion by id
getById(id: any): Observable<Publicacion> {
  return this.http.get<Publicacion>(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get All Publicaciones
getAll(): Observable<Publicacion> {
  return this.http.get<Publicacion>(this.basePath, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Update Publicacion
update(id: any, item: any): Observable<Publicacion> {
  return this.http.post<Publicacion>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Delete Publicacion
delete(id: any) {
  return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

}