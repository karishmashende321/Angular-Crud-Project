import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  items = ['ID Card', 'Attendance'];
  employeeForm:FormGroup
  submitted:any=false;
  editoperation=false;
  selectedemp:any
  employeeList:any=[];
  termemp="";
  constructor(private formBuilder:FormBuilder) {
   
   
    this.employeeForm = this.formBuilder.group ({
      Name:['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      Id:['' , [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      MobileNo:['', [Validators.required, Validators.maxLength(10)]]

    })

    let empdata = localStorage.getItem('EMPLOYEE_LIST');
    if(empdata){
      this.employeeList = JSON.parse(empdata);
    }
  
   }

  ngOnInit(): void {
  }

  save(){
    this.submitted=true;

    if(this.employeeForm.valid){
      this.employeeForm.value.id=this.id_random();
      this.employeeList.push(this.employeeForm.value)
      console.log("Submit Sucessfully",this.employeeForm.value);
      alert("Form is valid.... submitted Sucessfully...!")
      this.submitted=false;
   }
   else{
    alert("Form is not-valid.... please try again...!")
   }
    this.employeeForm.reset();
    localStorage.setItem("EMPLOYEE_LIST", JSON.stringify(this.employeeList))
     
  }

  Updateemp(){
    this.editoperation=false;
   
   this.employeeList[this.selectedemp].Name=this.employeeForm.value.Name;
   this.employeeList[this.selectedemp].Id=this.employeeForm.value.Id;
   this.employeeList[this.selectedemp].MobileNo=this.employeeForm.value.MobileNo;
   this.clear()
 
   localStorage.setItem("EMPLOYEE_LIST", JSON.stringify(this.employeeList))
   
 }

 edit(obj:any ){

    this.editoperation=true;
    this.selectedemp=this.employeeList.findIndex((x:any)=> x.id ===obj.id);
    console.log('this.selectedemployee', this.selectedemp)

    this.employeeForm.patchValue({
     Name: obj.Name,
     Id: obj.Id,
     MobileNo: obj.MobileNo
})
 }  
  
  trash(id:any){
    this.selectedemp=this.employeeList.findIndex((x:any)=> x.id ===id);
    console.log("Delete",this.selectedemp);
    this.employeeList.splice(this.selectedemp,1)

    localStorage.setItem("EMPLOYEE_LIST", JSON.stringify(this.employeeList))
  }

  get f(){
    return this.employeeForm.controls
  }

  clear(){
    this.employeeForm.reset();
  }

  id_random(){
    return '_' + Math.random().toString(36).substr(2,9);
  }
}
