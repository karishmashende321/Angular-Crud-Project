import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted:any=false;

  registerForm:FormGroup

  constructor(private formBuilder:FormBuilder) {
    this.registerForm = this.formBuilder.group ({
      Name:['',[Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      email:['',[Validators.required, Validators.minLength(6), Validators.email]],
      password:['',[Validators.required,Validators.minLength(5), Validators.maxLength(10)]],
      DOB:['',[Validators.required,]],
      MobileNo:['',[Validators.required,Validators.minLength(10), Validators.maxLength(13)]],
      Address:['',[Validators.required,Validators.minLength(6), Validators.maxLength(15)]],
      state:['',[Validators.required,]]

    })
  
   }

  ngOnInit(): void {
  }

  success(){
    this.submitted=true;

    if(this.registerForm.valid){
      console.log("Hence You have Sucessfully Register",this.registerForm.value);
      alert("Form is valid.... submitted Sucessfully...!")
      this.submitted=false;
   }
   else{
    alert("Form is not-valid.... please try again...!")
   }
    this.registerForm.reset();
    
  }

  get f(){
    return this.registerForm.controls
  }
}


