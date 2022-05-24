import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  items = ['Account Statement',];
   statementForm:FormGroup
   editoperation=false;
  selected:any;
  stateterm="";
   submitted:any=false;

   statementList:any = [];

  constructor(private formBuilder:FormBuilder) {
    this.statementForm = this.formBuilder.group({
      idea:['',[Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      description:['',[Validators.required,Validators.minLength(10),Validators.maxLength(50)]]
    }) 
    let Studentdata = localStorage.getItem('STATEMENT_LIST');
    if(Studentdata){
      this.statementList = JSON.parse(Studentdata);
    }
   }
   
  ngOnInit(): void {
    

  }

  statementsubmit(){
    this.submitted=true;
   
    if(this.statementForm.valid){
      this.statementForm.value.id=this.id_random();
      this.statementList.push(this.statementForm.value)
      console.log("sucessfully add dta",this.statementForm.value);
      alert("Form is valid.... submitted Sucessfully...!")
      this.submitted=false;
   }
   else{
    alert("Form is not-valid.... please try again...!")
   }

   this.clear();
   localStorage.setItem("STATEMENT_LIST", JSON.stringify(this.statementList))
  }

  Update(){
     this.editoperation=false;
    
    this.statementList[this.selected].idea=this.statementForm.value.idea;
    this.statementList[this.selected].description=this.statementForm.value.description;
    this.clear();
    localStorage.setItem("STATEMENT_LIST", JSON.stringify(this.statementList))
  
  }
 
  statementedit(obj:any){
    this.editoperation=true;
 
    this.selected=this.statementList.findIndex((x:any)=> x.id ===obj.id);
    console.log('this.selectedstatement', this.selected)

    this.statementForm.patchValue({
     idea: obj.idea,
     description: obj.description,
     
})
    
  }

  statementtrash(id:any){
    this.selected=this.statementList.findIndex((x:any)=> x.id ===id);
    console.log("Delete",this.selected);
    this.statementList.splice(this.selected,1)

    localStorage.setItem("STATEMENT_LIST", JSON.stringify(this.statementList))
  }

  clear(){
    this.statementForm.reset();
  }

  get f(){
    return this.statementForm.controls
  }

  id_random(){
    return '_' + Math.random().toString(36).substr(2,9);
  }
}
