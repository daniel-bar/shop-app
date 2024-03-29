import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageGuardService } from './services/guards/page-guard.service';
import { AuthGuardService } from './services/guards/auth-guard.service';

import { InBagProductsResolver } from './services/resolvers/in-bag-products-resolver.service';
import { ProductResolver } from './services/resolvers/product-resolver.service';
import { AddProductResolver } from './services/resolvers/add-product-resolver.service';
import { ContactResolver } from './services/resolvers/contact-resolver.service';
import { ProductsResolver } from './services/resolvers/products-resolver.service';

import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ProductComponent } from './components/pages/product/product.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { AccountOverviewComponent } from './components/pages/profile/account-overview/account-overview.component';
import { UserComponent } from './components/pages/profile/edit-details/edit-details.component';
import { MyOrdersComponent } from './components/pages/profile/my-orders/my-orders.component';
import { ShoppingBagComponent } from './components/pages/shopping-bag/shopping-bag.component';
import { CheckoutComponent } from './components/pages/shopping-bag/checkout/checkout.component';
import { AddProductComponent } from './components/pages/add-product/add-product.component';
import { ProductsComponent } from './components/pages/products-list/products-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [PageGuardService],
    resolve: { data: AddProductResolver },
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [PageGuardService],
    resolve: { topics: ContactResolver },
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    resolve: { product: ProductResolver },
  },
  {
    path: 'shopping-bag',
    component: ShoppingBagComponent,
    canActivate: [PageGuardService],
    resolve: { products: InBagProductsResolver },
    children: [{ path: 'checkout', component: CheckoutComponent }],
  },
  {
    path: 'product-list',
    component: ProductsComponent,
    resolve: { products: ProductsResolver },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuardService],
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [PageGuardService],
    children: [
      { path: '', component: AccountOverviewComponent },
      { path: 'account-overview', component: AccountOverviewComponent },
      { path: 'edit-details', component: UserComponent },
      { 
        path: 'my-orders',
        component: MyOrdersComponent,
        resolve: { products: InBagProductsResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
