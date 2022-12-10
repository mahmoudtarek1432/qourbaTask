import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { accountReducer } from './state/Account/account.reducer';
import { CartReducer } from './state/Cart/cart.reducer';
import { ProductsComponent } from './products/products.component';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtTokenInterceptor } from './services/Interceptors/jwtTokenInterceptor';
import { ItemComponent } from './products/item/item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingComponent } from './loading/loading.component';
import { processReducer } from './state/Processing/processing.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProductsComponent,
    ItemComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      AuthToken : accountReducer,
      cart : CartReducer,
      process : processReducer
    }),
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    AuthenticationService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
