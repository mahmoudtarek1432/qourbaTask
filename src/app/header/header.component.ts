import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthToken } from '../shared/model/Account';
import { AccountLogin } from '../state/Account/account.action';
import { accountReducer } from '../state/Account/account.reducer';
import { AuthState } from '../state/Account/account.state';
import { UserCart } from '../state/Cart/cart.action';
import { cartState } from '../state/Cart/cart.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchForm!:FormGroup;
  loggedIn?: boolean
  cart?:number | null
  constructor(private userStore: Store<AuthState>, private cartStore: Store<cartState>, private router:Router,private fb:FormBuilder){

    this.userStore.select("AuthToken").subscribe(r => this.loggedIn = r?.isActive)
    this.cartStore.select("cart").subscribe(r =>{ this.cart = r.count; console.log(r.count)})
  }

  //removes the token from local storage and dispatch an event through ngrx
  logout(){
    this.userStore.dispatch(AccountLogin({token:"",isActive:false}))
    if(localStorage["Token"]){
      localStorage.removeItem("Token")
    }
    this.router.navigate(["/login"])
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search : ['',Validators.required],
    })
  }

  onSubmitSearch(){
    this.router.navigate(["/products/search"],{
      queryParams:{q: this.searchForm?.get('search')?.value }
    })
  }
}
