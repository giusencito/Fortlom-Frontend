import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {Fanatic} from "../../models/fanatic";

@Injectable({
  providedIn: 'root'
})
export class FanaticService {

basePath = 'http://localhost:8080/api/v1/fanatics';
basePath2 ='http://localhost:3000/Fanatic';

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

// Create Fanatic
create(item: any): Observable<Fanatic> {
  return this.http.post<Fanatic>(this.basePath2, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get Fanatic by id
getById(id: any): Observable<Fanatic> {
  return this.http.get<Fanatic>(`${this.basePath2}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Get All Fanatics
getAll(): Observable<Fanatic> {
  return this.http.get<Fanatic>(this.basePath2, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Update Fanatic
update(id: any, item: any): Observable<Fanatic> {
<<<<<<< HEAD
  return this.http.post<Fanatic>(`${this.basePath2}/${id}`, JSON.stringify(item), this.httpOptions)
=======
  return this.http.put<Fanatic>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
>>>>>>> origin/feature/feature-US09A
    .pipe(
      retry(2),
      catchError(this.handleError));
}

// Delete Fanatic
delete(id: any) {
  return this.http.delete(`${this.basePath2}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}

}
