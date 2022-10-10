import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  retData: any;

  constructor(
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    });
  }



  async signupUser() {
    if (
      this.signupForm.value.userName === null ||
      this.signupForm.value.userName === ''
    ) {
      alert('Username is a required field.');
    } else if (
      this.signupForm.value.password === null ||
      this.signupForm.value.password === ''
    ) {
      alert('Password is a required field.');
    }
    else{
      const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
      this._http.post<any>('http://localhost:8080/register', { username: this.signupForm.value.userName, password: this.signupForm.value.password}, {headers}).subscribe(data => {
        this.retData = JSON.stringify(data.role);
        console.log(data)
        window.sessionStorage.setItem('login', 'true');
        alert('You have Been Successfully Registered!');
        // this.loginForm.reset();
        this.router.navigate(['/products']);
    })
    }
  }

}
