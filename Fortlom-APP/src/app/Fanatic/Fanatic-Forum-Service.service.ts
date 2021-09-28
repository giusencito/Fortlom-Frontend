import { Injectable } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http'
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import { Forum } from './Fanatic-Forum';
@Injectable({
  providedIn: 'root'
})
export class FanaticForumServiceService {

 basepath= "http://localhost:3000/Forum"
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
constructor(private http:HttpClient) { }
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // Default error handling
    console.log(`An error occurred: ${error.error.message} `);
  } else {
    // Unsuccessful Response Error Code returned from Backend
    console.error(
      `Backend returned code ${error.status}, body was: ${error.error}`
    );
  }
  // Return Observable with Error Message to Client
  return throwError('Something happened with request, please try again later');
}
 // Create Forum
 create(item: any): Observable<Forum> {
  return this.http.post<Forum>(this.basepath, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
getById(id: any): Observable<Forum> {
  return this.http.get<Forum>(`${this.basepath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
getAll(): Observable<Forum> {
  return this.http.get<Forum>(this.basepath, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
update(id: any, item: any): Observable<Forum> {
  return this.http.put<Forum>(`${this.basepath}/${id}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}
delete(id: any) {
  return this.http.delete(`${this.basepath}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
}


}
