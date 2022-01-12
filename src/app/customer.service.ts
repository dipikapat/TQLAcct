import { Injectable } from '@angular/core';  
import { HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { Customer } from './customer';  
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 apiUrl:string ="https://localhost:44325/"
  constructor(private http: HttpClient) { }

  createCustomer(customer:Customer): Observable <any>{  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Customer>( this.apiUrl + 'Billable/CreateCustomerBilling',  
    customer, httpOptions);  
  } 

  getCustomerDetails(poNumber:number):Observable <any>{
    const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' }
    return this.http.get<Customer>(this.apiUrl + 'Billable/GetCustomerBillingInvoice/?poNumber='+ poNumber,{ headers }).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
