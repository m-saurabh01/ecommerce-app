import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ManageProductsComponent implements OnInit {

  searchForm!: FormGroup;
  addProductForm!: FormGroup;
  addMultipleProductsForm!: FormGroup;
  retData: any;
  stocks: any;
  addButtonClickedFlag: boolean = false;
  mailButtonflag: boolean = false;
  addMultipleButtonClickedFlag: boolean = false;
  getStocksButtonClickedFlag: boolean = false;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.searchForm = this.formBuilder.group({
      category: [''],
    });
    this.addProductForm = this.formBuilder.group({
      name: [''],
      price: [''],
      desc: [''],
      category: [''],
      image: [''],
      stock: [''],
    });
    this.addMultipleProductsForm = this.formBuilder.group({
      csv: [''],
    });
  }

  async getProducts(){
    if(this.searchForm.value.category != null && this.searchForm.value.category.length > 0){
      console.log("getting products by category")
      this.getAllProductsByCategory();
    }else{
      console.log("getting all products")
      this.getAllProducts();
    }
  }

  async getAllProducts(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.get<any>('http://localhost:8081/products', {headers}).subscribe(data => {
        this.retData = data;
  })
}

  async getAllProductsByCategory(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.get<any>('http://localhost:8081/products/category?category='.concat(this.searchForm.value.category), {headers}).subscribe(data => {
        this.retData = data;
    })
  }

  async addProduct(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this._http.post<any>('http://localhost:8081/add/product',
      {
        name: this.addProductForm.value.name,
        price: this.addProductForm.value.price,
        description: this.addProductForm.value.desc,
        category: this.addProductForm.value.category,
        imageURL: this.addProductForm.value.image,
        stock: this.addProductForm.value.stock
      }, {headers}).subscribe(data => {
        console.log(data)
        if(data !== undefined) {
          this.getAllProducts();
          this.addButtonClickedFlag = false;
          this.addMultipleButtonClickedFlag = false;
          this.getStocksButtonClickedFlag = false;
        }
    })
  }

  addButtonClicked(){
    this.addButtonClickedFlag = true;
  }

  addMultipleButtonClicked(){
    this.addMultipleButtonClickedFlag = true;
  }

  getStocksButtonClicked(){
    this.getStocksButtonClickedFlag = true;
  }

  cancelButtonClicked(){
    this.addButtonClickedFlag = false;
    this.addMultipleButtonClickedFlag = false;
    this.getStocksButtonClickedFlag = false;
  }

  editProduct(event: any){
    this.router.navigate(['/edit/product', event.target.id as number]);
  }

  async deleteProduct(event: any){
    if(confirm('Are you sure you want to delete this product?')){
      const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
        this._http.delete<any>('http://localhost:8081/delete/product?productId='.concat(event.target.id), {headers}).subscribe(data => {
          this.retData = this.getAllProducts();
      })
    }
  }

  async addMultipleProducts(){
    console.log(this.addMultipleProductsForm.value.csv)
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this._http.post<any>('http://localhost:8081/add/products', this.addMultipleProductsForm.value.csv, {headers}).subscribe(data => {
        console.log(data)
        if(data !== undefined) {
          this.getAllProducts();
          this.addButtonClickedFlag = false;
          this.addMultipleButtonClickedFlag = false;
          this.getStocksButtonClickedFlag = false;
        }
    })
  }

  async getStocks(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.get<any>('http://localhost:8081/stocks', {headers}).subscribe(data => {
        this.stocks = data;
  })
  }

  mail(){
    window.alert("An Email has been sent to provider with deatils of product with stock less than 20")
  }

}
