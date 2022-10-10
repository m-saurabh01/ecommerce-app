import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  reports:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getAllReports();
  }

  async getAllReports(){
    
     this.http.get<any>('http://localhost:8083/ReportController/reports')
    .pipe(map((res:any)=>{
        return res;
      }))
    
    .subscribe(res=>{
      this.reports = res;
    })
  }
}


