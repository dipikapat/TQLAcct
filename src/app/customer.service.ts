import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { Customer } from './customer';  
 
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
}
