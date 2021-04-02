import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ProductComponent } from './components/pages/product/product.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

import { AccountOverviewComponent } from './components/pages/profile/account-overview/account-overview.component';
import { EditDetailsComponent } from './components/pages/profile/edit-details/edit-details.component';
import { MyOrdersComponent } from './components/pages/profile/my-orders/my-orders.component';
import { ShoppingBagComponent } from './components/pages/shopping-bag/shopping-bag.component';
import { CheckoutComponent } from './components/pages/shopping-bag/checkout/checkout.component';
import { AddProductComponent } from './components/pages/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product', component: ProductComponent },
  {
    path: 'shopping-bag', component: ShoppingBagComponent, children: [
      { path: 'checkout', component: CheckoutComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile', component: ProfileComponent, children: [
      { path: '', component: AccountOverviewComponent },
      { path: 'account-overview', component: AccountOverviewComponent },
      { path: 'edit-details', component: EditDetailsComponent },
      { path: 'my-orders', component: MyOrdersComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }