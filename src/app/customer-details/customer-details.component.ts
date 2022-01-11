import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';  
import { Customer } from '../customer';  

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
   

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
CreateCustomer(customer:Customer){
  console.log(customer.weight);
  customer.weight = +customer.weight;
  console.log(customer.weight);
this.customerService.createCustomer(customer).subscribe((d :Customer)=>
  {
    console.log(d);
});
}
}
