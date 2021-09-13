import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { ContactService } from './services/contact.service';
import { ProductService } from './services/product.service';
import { PaymentService } from './services/payment.service';
import { UserService } from './services/user.service';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HttpAuthService } from './services/http/http-auth.service';
import { HttpContactService } from './services/http/http-contact.service';
import { HttpProductService } from './services/http/http-product.service';
import { HttpPaymentService } from './services/http/http-payment.service';
import { HttpUserService } from './services/http/http-user.service';

import { PageGuardService } from './services/guards/page-guard.service';
import { AuthGuardService } from './services/guards/auth-guard.service';

import { InBagProductsResolver } from './services/resolvers/in-bag-products-resolver.service';
import { ProductResolver } from './services/resolvers/product-resolver.service';
import { ProductsResolver } from './services/resolvers/products-resolver.service';
import { AddProductResolver } from './services/resolvers/add-product-resolver.service';
import { ContactResolver } from './services/resolvers/contact-resolver.service';

import { AppComponent } from './app.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ProductComponent } from './components/pages/product/product.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { AccountOverviewComponent } from './components/pages/profile/account-overview/account-overview.component';
import { MyOrdersComponent } from './components/pages/profile/my-orders/my-orders.component';
import { UserComponent } from './components/pages/profile/edit-details/edit-details.component';
import { ShoppingBagComponent } from './components/pages/shopping-bag/shopping-bag.component';
import { ProductsComponent } from './components/pages/products-list/products-list.component';
import { SelectComponent } from './components/UI/select/select.component';
import { CheckoutComponent } from './components/pages/shopping-bag/checkout/checkout.component';
import { AddProductComponent } from './components/pages/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    UserComponent,
    ShoppingBagComponent,
    ProductsComponent,
    SelectComponent,
    CheckoutComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    HttpAuthService,
    HttpContactService,
    HttpProductService,
    HttpPaymentService,
    HttpUserService,
    AuthService,
    ContactService,
    ProductService,
    PaymentService,
    UserService,
    PageGuardService,
    AuthGuardService,
    InBagProductsResolver,
    ProductResolver,
    ProductsResolver,
    AddProductResolver,
    ContactResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
