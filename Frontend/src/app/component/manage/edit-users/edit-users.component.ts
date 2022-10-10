import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  retData: any | undefined;
  userId: any | null;
  dataLoaded: boolean = false;
  updateUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient,
    private router: Router, private route: ActivatedRoute) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUser();
   }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      userId: [''],
      userName: [''],
      password: [''],
      role: [''],
    });
  }

  async getUser() {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this._http.get<any>(`http://localhost:8080/user?userId=${this.userId}`, { headers }).subscribe((data: any[]) => {
      this.retData = data[0];
      this.dataLoaded = true;
      this.updateUserForm = this.formBuilder.group({
        userId: [this.retData.userId],
        userName: [this.retData.username],
        password: [this.retData.password],
        role: [this.retData.role],
      });
    })
  }

  async updateUser(){
    console.log(this.retData.userId)
    console.log(this.updateUserForm.value.userName)
    console.log(this.updateUserForm.value.password)
    console.log(this.updateUserForm.value.role)
    const reqBody ={
      userId: this.retData.userId,
      username: this.updateUserForm.value.userName,
      password: this.updateUserForm.value.password,
      role: this.updateUserForm.value.role,
    };
    console.log(reqBody)
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this._http.put<any>('http://localhost:8080/update/user',
    reqBody, {headers}).subscribe(data => {
        console.log(data)
        if(data !== undefined) {
          this.router.navigate(['admin/manage/users']);
        }
    })
  }

}
