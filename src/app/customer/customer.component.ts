import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

//  items = ['Pan  Card', 'Aadhar Card'];
  submitted:any=false;
  editoperation=false;
  selectedcust:any;
  customerList:any=[];
  customerForm:FormGroup
  custext="";
  reset: any;
 
  items = ['Adhar', 'PanCard'];

  constructor(private formBuilder:FormBuilder) {

    this.customerForm = this.formBuilder.group ({
      Name:['', [Validators.required , Validators.minLength(6), Validators.maxLength(10)]],
      Email:['', [Validators.required,Validators.minLength(6),Validators.email]],
      Mobile:['', [Validators.required, Validators.maxLength(10)]]

    })
    
    let custdata = localStorage.getItem('CUSTOMER_LIST');
    if(custdata){
      this.customerList = JSON.parse(custdata);
    }
   }

  ngOnInit(): void {
  }

  custsave(){
   
   this.submitted=true;
  
   if(this.customerForm.valid){
    this.customerForm.value.id=this.id_random();
    this.customerList.push(this.customerForm.value)
    console.log("Sucessfully Submitted",this.customerForm.value);
      alert("Form is valid.... submitted Sucessfully...!")
      this.submitted=false;
   }
   else{
    alert("Form is not-valid.... please try again...!")
   }
   this.clear()
   
   localStorage.setItem("CUSTOMER_LIST", JSON.stringify(this.customerList))
  
  }
  
  Updatecust(){
     this.editoperation=false;
    
    this.customerList[this.selectedcust].Name=this.customerForm.value.Name;
    this.customerList[this.selectedcust].Email=this.customerForm.value.Email;
    this.customerList[this.selectedcust].Mobile=this.customerForm.value.Mobile;
    this.clear()
  
    localStorage.setItem("CUSTOMER_LIST", JSON.stringify(this.customerList))
    
  }

  custedit( obj:any ){
     this.editoperation=true;
     this.selectedcust=this.customerList.findIndex((x:any)=> x.id ===obj.id);
    console.log('this.selectedcustomer', this.selectedcust);

     this.customerForm.patchValue({
      Name: obj.Name,
      Email: obj.Email,
      Mobile: obj.Mobile
 })
  }  
  
  custtrash(id:any){
    this.selectedcust=this.customerList.findIndex((x:any)=> x.id ===id);
    console.log("Delete",this.selectedcust);
    this.customerList.splice(this.selectedcust,1)

    localStorage.setItem("CUSTOMER_LIST", JSON.stringify(this.customerList))
  }

  get f(){
    return this.customerForm.controls
  }
  
 clear(){
   this.customerForm.reset();
 }

 id_random(){
  return '_' + Math.random().toString(36).substr(2,9);
}
}
