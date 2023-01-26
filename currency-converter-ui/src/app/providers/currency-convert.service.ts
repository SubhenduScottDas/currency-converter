import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertService {

  constructor(private http: HttpClient) { }

  public getSymbols(): Observable<any> {
    let url = "http://localhost:3000/currency/";
    return this.http.get<any>(url);
  }

  public getExchange(from: any, to: any, amount: any): Observable<any> {
    let url ="http://localhost:3000/convert/";
    let queryParams = new HttpParams();
    // queryParams = queryParams.append('from', from);
    // queryParams = queryParams.append('to', to);
    // queryParams = queryParams.append('amount', amount);
    // return this.http.post<any>(url, {params: queryParams});
    return this.http.post<any>(url, {"from": from, "to": to, "amount": amount});
  }
}
