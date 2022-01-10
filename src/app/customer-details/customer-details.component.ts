import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';  

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
      shippingFrom: ['', Validators.required],
      shippingTo: ['', Validators.required],
      cityFrom: ['', Validators.required],
      cityTo: ['', Validators.required],    
      postalCodeFrom:['', Validators.required],
      postalCodeTo:['', Validators.required],
      commodity:['',Validators.required],
      weight:['',Validators.required],
      pickupDate:['',Validators.required],
      contactPersonNo:['',Validators.required],
      delivery:['',Validators.required]

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
CreateCustomer(customer:any){
this.customerService.createCustomer(customer).subscribe(() =>
  {
    console.log("success");
    this.form.reset(); 
});
}
}
