import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  retData: any;

  constructor(private _http: HttpClient,
    private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.get<any>('http://localhost:8080/users', {headers}).subscribe(data => {
        this.retData = data;
    })
  }

  editUser(event: any){
    this.router.navigate(['/edit/user', event.target.id as number]);
  }

  async deleteUser(event: any){
    if(confirm('Are you sure you want to delete this product?')){
      const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
        this._http.delete<any>('http://localhost:8080/delete/user?userId='.concat(event.target.id), {headers}).subscribe(data => {
          this.retData = this.getUsers();
      })
    }
  }

}
