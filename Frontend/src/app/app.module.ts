import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupComponent } from './component/signup/signup.component';
import { UsersComponent } from './component/manage/users/users.component';
import { ManageProductsComponent } from './component/manage/products/products.component';
import { AdminComponent } from './component/admin/admin.component';
import { HomeComponent } from './component/home/home.component';
import { ProductCategoryComponent } from './component/product-category/product-category.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { FooterComponent } from './component/footer/footer.component';
import { EditProductComponent } from './component/manage/edit-product/edit-product.component';
import { EditUsersComponent } from './component/manage/edit-users/edit-users.component';
import { DiscountComponent } from './component/discount/discount.component';
import { SearchComponent } from './component/search/search.component';
import {MatButtonModule} from '@angular/material/button';
import { SalesComponent } from './component/sales/sales.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    ManageProductsComponent,
    AdminComponent,
    HomeComponent,
    ProductCategoryComponent,
    WishlistComponent,
    FooterComponent,
    EditProductComponent,
    EditUsersComponent,
    DiscountComponent,
    SearchComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
