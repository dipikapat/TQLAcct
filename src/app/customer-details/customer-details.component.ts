import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';  
import { Customer } from '../customer'; 
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
 

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  poNumber:number=0;
  popupVisible = false;
  customer:any="";
  fromAddress!:string;
  toAddress!:string;
  commodity!:string;
  tax!:number;
  totalCost!:number;

   

  constructor(private formBuilder: FormBuilder,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address:['', [Validators.required]],
      fromAddress: ['', Validators.required],
      toAddress: ['', Validators.required],
      fromCity: ['', Validators.required],
      toCity: ['', Validators.required],    
      fromPostalCode:['', Validators.required],
      toPostalCode:['', Validators.required],
      commodity:['',Validators.required],
      weight:['',Validators.required],
      pickupDate:['',Validators.required],
      contactPersonNo:['',Validators.required],
      deliveryType:['',Validators.required],
      comments:['']

  } );
}
get primEmail(){
	return this.form.get('email')
  }
onSubmit(value:any){
   this.submitted = true;
   console.log(this.form)
   const customer = this.form.value;
   this.CreateCustomer(customer);
}
getInvoiceDetails(){
  if(this.poNumber != null){
    this.popupVisible = true;
    this.GetCustomerDetails(this.poNumber);
  } 
  
}
GetCustomerDetails(poNumber:number){
  this.customerService.getCustomerDetails(poNumber).subscribe((response:Customer) =>{
    console.log(response);
    this.customer = response;
    this.fromAddress = response.fromAddress;
    this.toAddress = response.toAddress;
    this.commodity = response.commodity;
    this.tax = response.tax;
    this.totalCost = response.totalCost;
  })
}

CreateCustomer(customer:Customer){
  console.log(customer.weight);
  customer.weight = +customer.weight;
  customer.phoneNo = +customer.phoneNo;
  customer.fromPostalCode = +customer.fromPostalCode;
  customer.toPostalCode = +customer.toPostalCode;
  console.log(customer.weight);
this.customerService.createCustomer(customer).subscribe((d :Customer)=>
  {
    console.log(d);
    if(d.poNumber != null){
      this.poNumber = d.poNumber
    }
});
}
}
