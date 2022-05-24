import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 loginform!: FormGroup;

 submitted:any=false;

  constructor(private formBuilder:FormBuilder) {
    this.loginform = this.formBuilder.group ({
      email:['',[Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password:['',[Validators.required, Validators.minLength(5), Validators.email]],
      
    })
   }

  ngOnInit(): void {
   
  
  }

  submit(){
    this.submitted=true;

    if(this.loginform.valid){
      console.log("Sucessfully",this.loginform.value);
      alert("Form is valid.... submitted Sucessfully...!")
      this.submitted=false;
   }
   else{
    alert("Form is not-valid.... please try again...!")
   }
    this.loginform.reset();
    

  }

  get f(){
    return this.loginform.controls
  }
 
}
