import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public products: any;
  public users: any;

  constructor(private _http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUsers();
  }

  async getProducts(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.get<any>('http://localhost:8081/products', {headers}).subscribe(data => {
        this.products = data;
        this.products = this.products.slice(0, 5)
    })
  }

  async getUsers(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.get<any>('http://localhost:8080/users', {headers}).subscribe(data => {
        this.users = data;
        this.users = this.users.slice(0, 5)
    })
  }

}
