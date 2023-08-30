import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // HTTP GET
  public Get<T>(endPoint: string, id: any = ""): Observable<T[]> {
    let url: string = `${environment.path}/${(id === "") ? endPoint : `${endPoint}/verification?id=${id}`}`;
    return this.http.get<T[]>(url)
      .pipe(
        catchError(() => of(null)),
        map((resp: any) => resp ? resp : [])
      );
  }

  // HTTP POST
  public Post<T>(endPoint: string, data: any): Observable<T[]> {
    let url: string = `${environment.path}/${endPoint}`;
    return this.http.post<T[]>(url, JSON.stringify(data))
      .pipe(
        catchError(() => of(null)),
        map((resp: any) => resp ? resp : [])
      );
  }

  // HTTP PUT
  public Put<T>(endPoint: string, data: any): Observable<T[]> {
    let url: string = `${environment.path}/${endPoint}`;
    return this.http.put<T[]>(url, JSON.stringify(data))
      .pipe(
        catchError(() => of(null)),
        map((resp: any) => resp ? resp : [])
      );
  }

  // HTTP DELETE
  public Delete<T>(endPoint: string, id: any): Observable<T[]> {
    let url: string = `${environment.path}/${endPoint}?id=${id}`;
    return this.http.delete<T[]>(url)
      .pipe(
        catchError(() => of(null)),
        map((resp: any) => resp ? resp : [])
      );
  }
}
