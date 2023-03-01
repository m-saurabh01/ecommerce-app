import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {

  loginForm!: FormGroup;
  retData: any;
  userId:any;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      npassword:['']
    });
  }

  async pwdUser() {
    if (
      this.loginForm.value.userName === null ||
      this.loginForm.value.userName === ''
    ) {
      alert('User email is a required field.');
    } else if (
      this.loginForm.value.password === null ||
      this.loginForm.value.password === ''
    ) {
      alert('Old Password is a required field.');
    }else if (
      this.loginForm.value.npassword === null ||
      this.loginForm.value.npassword === ''
    ) {
      alert('New Password is a required field.');
    }
    
    else{
      const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.post<any>('http://localhost:8080/'+this.loginForm.value.userName+'/'+this.loginForm.value.password+'/'+this.loginForm.value.npassword,{headers}).subscribe(data => {
        this.retData = data.role;
        
        

        this._http.post<any>('http://localhost:8080/userId', { username: this.loginForm.value.userName, password: this.loginForm.value.password}, {headers}).subscribe(data => {
        this.userId = data;
        console.log(this.userId)
        window.localStorage.setItem('userID', this.userId);
    });
        // this.loginForm.reset();
        if("ADMIN" === this.retData){
          this.router.navigate(['/admin']);
        } else if(null===this.retData){
          alert('Invalid Username or password')
        }

        else {
          alert('Password reset success');
          this.router.navigate(['/home']);
        }
    })
    }}

}
