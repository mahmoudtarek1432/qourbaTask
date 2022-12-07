import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  formErrors:any = {
    "email":'',
    'password':''
  }

  ValidationMessage:any = {
    'email':{
      "required": 'Email is required',
      'email': 'Wrong email format'
    },
    'password':{
      "required": 'The password is required',
      'minlength': 'The password has to be more than 8 characters',
      'pattern': 'the password can contain characters and numbers only'
    }
  }

  constructor(private formbuilder:FormBuilder){

  }

  ngOnInit(){
    this.creatForm();
    this.loginForm?.valueChanges.subscribe((data)=> this.onValueChange(data));
    this.onValueChange();
  }

  creatForm(){
    this.loginForm = this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern]]
    })
  }

  onValueChange(data?:any){
    if(!this.loginForm){return}
    const form = this.loginForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){

        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.ValidationMessage[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){

              this.formErrors[field] += (this.formErrors[field] != '')?'<br>'+ messages[key] + ' ': ''+ messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmitLogin(){
    console.log("sdasd")
    fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({

      username: 'kminchelle',
      password: '0lelplR',
      // expiresInMins: 60, // optional
    })
  })
  .then(res => res.json())
  .then(console.log);
  }

}
