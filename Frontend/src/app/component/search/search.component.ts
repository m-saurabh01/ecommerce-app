import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchList:any;
  enteredSearch:string='';
  searchUrl:string='';

  constructor(private api : ApiService, private cartService : CartService, private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.onSearch();
   
  }

  addtoCart(item: any){
    if(this.isLoggedIn()){
      this.cartService.addtoCart(item);
    }else{
      alert("You must be logged in to add items in your cart!!!")
      this.router.navigate(['/login']);
    }
  }

   addToWishlist(item: any){
    if(this.isLoggedIn()){
      this.cartService.addToWishlist(item);
    }else{
      alert("You must be logged in to add items in your cart!!!")
      this.router.navigate(['/login']);
    }
  }

   isLoggedIn(){
    return window.localStorage.getItem("login") === "true";
  }

  confirmRole(){
    return window.localStorage.getItem('role')==='USER';
  }

  onSearchRepeat(searchData:string){
    this.enteredSearch=searchData;
    console.log(this.enteredSearch+"Hi");
    this.getSearchResult(this.enteredSearch);
  }

  onSearch(){
    this.enteredSearch=HeaderComponent.search;
    console.log(this.enteredSearch+"Hi");
    this.getSearchResult(this.enteredSearch);
  }

  async getSearchResult(data:string){
    this.searchUrl='http://localhost:8081/products/'+data;
     this.http.get<any>(this.searchUrl)
    .pipe(map((res:any)=>{
        return res;
      }))
    
    .subscribe(res=>{
      this.searchList = res;
      this.searchList.forEach((a:any) =>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    })
  }
  
  
}
