import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../customer.service';  
import { Customer } from '../customer'; 
import { DxPopupModule, DxButtonModule, DxTemplateModule ,DxToastModule} from 'devextreme-angular';
import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';
 

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
  submitmessage ="Customer Details Saved";
  isVisible:boolean =false;
  type ="info";
  onsaveClick = true;

   

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
 
onSubmit(value:any){
   this.submitted = true;
   console.log(this.form)
   const customer = this.form.value;
   this.CreateCustomer(customer);
   this.onsaveClick = false;
}
getInvoiceDetails(){
  if(this.poNumber != null){
    this.popupVisible = true;
    this.GetCustomerDetails(this.poNumber);
    if(this.customer != null){
      this.form.reset();
    }
    
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
    this.poNumber = response.poNumber;
  })
}

generatePDF(data1:any){

  html2canvas(data1).then(canvas => {

    let imgwidth =200;

    let imgheight = (canvas.height * imgwidth/canvas.width)

    const contentdataurl = canvas.toDataURL('image/png');

    let pdf = new jsPDF('l','mm','a4');

    var position =10;

    pdf.addImage(contentdataurl,'PNG',0,position,imgwidth,imgheight);

    pdf.save('Billable.pdf');
    this.popupVisible = false;
  })
}


public SavePDF(): void {  

  console.log("printing");

 

  let data =document.getElementById("container");

  this.generatePDF(data);

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

this.isVisible = true;

}
}
