import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ProductComponent } from './components/pages/product/product.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { AccountOverviewComponent } from './components/pages/profile/account-overview/account-overview.component';
import { MyOrdersComponent } from './components/pages/profile/my-orders/my-orders.component';
import { MyDetailsComponent } from './components/pages/profile/my-details/my-details.component';
import { ShoppingBagComponent } from './components/pages/shopping-bag/shopping-bag.component';
import { SelectComponent } from './components/UI/select/select.component';
import { CheckoutComponent } from './components/pages/shopping-bag/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AccountOverviewComponent,
    MyOrdersComponent,
    MyDetailsComponent,
    ShoppingBagComponent,
    SelectComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }