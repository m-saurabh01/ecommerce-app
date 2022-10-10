import { Component, OnInit, Output,EventEmitter, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ManageProductsComponent } from '../manage/products/products.component';

// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public totalWishedItem : number = 0;
  public static search: string;

  constructor(private cartService: CartService, private router: Router,private _http: HttpClient) { }
  enteredSearch:string='';
  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
    this.cartService.getWishlist()
    .subscribe(res=>{
      this.totalWishedItem = res.length;
    })
  }

  isLoggedIn(){
    return window.localStorage.getItem("login") === "true";
  }

  logout(){
    if(confirm("Are you sure you want to log out?")){
      window.localStorage.removeItem("login");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("userID");
      this.router.navigate(["/home"])
    }
  }

  confirmRole(){
    return window.localStorage.getItem('role')==='USER';
  }





searchForm =new FormGroup({
      searchValue:new FormControl('')
});

retData: any;

@Output()
searchData:EventEmitter<string>=new EventEmitter<string>();


    getProducts(){
    this.searchData.emit(this.searchForm.controls['searchValue'].value);
    HeaderComponent.search=this.searchForm.controls['searchValue'].value;
    console.log(this.searchForm.controls['searchValue'].value); 
    this.router.navigate(["/search"]);  
  }

  
}
