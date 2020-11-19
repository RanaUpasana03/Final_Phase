import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
productref = new FormGroup({
  name: new FormControl,
  description: new FormControl,
  company: new FormControl,
  image: new FormControl,
  price: new FormControl
})
result: string;
companies:Company[];

  constructor(private companyService: CompanyService, private productService: ProductService ,private router: Router) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data=>this.companies=data);
  }

  addNewProduct():void{
    this.productService.addProduct(this.productref.value).subscribe(data=>{

      this.router.navigate(['/products']);
      
    },
    (err) => {this.result = err});
  }

}
