import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public product : any = [];

  constructor(private cartService: CartService,private route:Router) { }

  ngOnInit(): void {
    this.cartService.getWishlist()
    .subscribe(res=>{
      this.product=res;
    })
  }
  removeItem(item: any){
    this.cartService.removeWishListItem(item);
  }

  emptyWishlist(){
    this.cartService.removeAllWishlist();
  }

  emptycart(){
    this.cartService.removeAllCart();
    
  }

  

  onClick(){
    
   this.cartService.wishlistToCart(this.product);
   this.emptyWishlist();
    this.route.navigate(["../cart"]);
  }

}
