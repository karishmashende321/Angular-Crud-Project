import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  items = ['Role', 'Position'];

   staffeditoperation=false;
  selectedstaff:any;

  submitted:any=false;

  staffForm:FormGroup

  staffList:any=[];
  staffterm="";

  constructor(private formBuilder:FormBuilder) {

  
    this.staffForm = this.formBuilder.group({
      
      staffname:['',[Validators.required, Validators.minLength(6),Validators.maxLength(15)]],
      staffrole:['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      gender:['',Validators.required]
    })

      let staffdata = localStorage.getItem('STAFF_LIST');
    if(staffdata){
      this.staffList = JSON.parse(staffdata);
    }

    
   }

  ngOnInit(): void {
    
  }

  staffsave(){
    this.submitted=true;  

    if(this.staffForm.valid){
      this.staffForm.value.id=this.id_random();
      this.staffList.push(this.staffForm.value)
    console.log("sucessfully entered data",this.staffForm.value)
      alert("Form is valid.... submitted Sucessfully...!")
      this.submitted=false;
   }
   else{
    alert("Form is not-valid.... please try again...!")
   }
    this.clear();
    localStorage.setItem("STAFF_LIST", JSON.stringify(this.staffList))
  }

  Updatestaff(){
     this.staffeditoperation=false;
    
    this.staffList[this.selectedstaff].staffname=this.staffForm.value.staffname;
    this.staffList[this.selectedstaff].staffrole=this.staffForm.value.staffrole;
    this.staffList[this.selectedstaff].gender=this.staffForm.value.gender;
    this.clear()
  
    localStorage.setItem("STAFF_LIST", JSON.stringify(this.staffList))
  }

  staffedit(obj:any){
    this.staffeditoperation=true;
    this.selectedstaff=this.staffList.findIndex((x:any)=> x.id ===obj.id);
    console.log('this.selectedstaff', this.selectedstaff);

    this.staffForm.patchValue({
     staffname: obj.staffname,
     staffrole: obj.staffrole,
     gender: obj.gender
})

  }
  
  stafftrash(id:any){
    this.selectedstaff=this.staffList.findIndex((x:any)=> x.id ===id);
    console.log("Delete",this.selectedstaff);
    this.staffList.splice(this.selectedstaff,1)

    localStorage.setItem("STAFF_LIST", JSON.stringify(this.staffList))
  }

  clear(){
    this.staffForm.reset();
  }

  get f(){
    return this.staffForm.controls
  }

  id_random(){
    return '_' + Math.random().toString(36).substr(2,9);
  }
}
