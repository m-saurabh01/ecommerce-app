import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  retData: any | undefined;
  prodId: number | null;
  dataLoaded: boolean = false;
  updateProductForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private _http: HttpClient,
    private router: Router, private route: ActivatedRoute) {
    this.prodId = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct();
  }

  ngOnInit(): void {
    this.updateProductForm = this.formBuilder.group({
      productId: [''],
      name: [''],
      price: [''],
      desc: [''],
      category: [''],
      image: [''],
      stock: [''],
    });
  }

  async updateProduct(){
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this._http.put<any>('http://localhost:8081/update/product',
      {
        productId: this.retData.productId,
        name: this.updateProductForm.value.name,
        price: this.updateProductForm.value.price,
        description: this.updateProductForm.value.desc,
        category: this.updateProductForm.value.category,
        imageURL: this.updateProductForm.value.image,
        stock: this.updateProductForm.value.stock
      }, {headers}).subscribe(data => {
        console.log(data)
        if(data !== undefined) {
          this.router.navigate(['admin/manage/products']);
        }
    })
  }

  async getProduct() {
    const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    this._http.get<any>(`http://localhost:8081/product?id=${this.prodId}`, { headers }).subscribe((data: any[]) => {
      this.retData = data[0];
      this.dataLoaded = true;
      this.updateProductForm = this.formBuilder.group({
        productId: [this.retData.productId],
        name: [this.retData.name],
        price: [this.retData.price],
        desc: [this.retData.description],
        category: [this.retData.category],
        image: [this.retData.imageURL],
        stock: [this.retData.stock],
      });
    })
  }

}
