import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Store } from '@ngrx/store'
import { AuthState } from './state/Account/account.state';
import { AccountLogin } from './state/Account/account.action';
import { processState } from './state/Processing/processing.state';
import { ProcessesLoading } from './state/Processing/processing.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DummyFrontEndDeveloperTask';

  constructor(private router: Router, private store:Store<AuthState>, private processStore:Store<processState>,  private AuthenticationService:AuthenticationService)
  {
    var res = localStorage.getItem("Token")
    store.dispatch(AccountLogin({token:res,isActive: (res)!=null }))

    processStore.dispatch(ProcessesLoading({Count: 0}))

  }

  //this is SUPPOSED to authorize the user... using a backend server an endpoint shall be dedicated to
  //decoding the jwt token and returning state
  //using a same site cookie is a better practice as localstorage will produce XSS valnurabilities but this is just a demo

 /* checkAuth(){
       //token present
      this.AuthenticationService.CheckAuth().subscribe(result =>{
        if(result != 'null'){
          console.log(result)
          console.log("user is authorized")
        }
        else{ //jwt token is present but expired/invalid
          console.log("user isn't authorized")
          localStorage.removeItem("Token")
        }
      })
    }*/
  }
