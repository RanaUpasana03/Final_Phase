import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[];
  editProductDiv: boolean;
  listProductDiv: boolean = true;
  selectedProductID: string;
  selectedCompany: String;

  productref = new FormGroup({
    name: new FormControl,
    description: new FormControl,
    company: new FormControl,
    image: new FormControl,
    price: new FormControl
  });

   companies: Company[];

  constructor(private productService: ProductService, private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(data=>
      this.products=data);
      this.companyService.getCompanies().subscribe(data=>this.companies=data);
  }
addNewProduct(): void{
  this.router.navigate(['/addNewProduct']);
}
deleteProduct(index): void{
  this.productService.deleteProductById(this.products[index]._id).subscribe(data=>console.log(data));
  location.reload();
    }

    editProduct(index): void{
      this.listProductDiv = false;
      this.editProductDiv = true;
      //this.companyref.setValue = this.companies[index].company;
      this.productref.controls['name'].setValue(this.products[index].name);  
      this.productref.controls['description'].setValue(this.products[index].description);  
      this.productref.controls['image'].setValue(this.products[index].image);  
    
      this.productref.controls['price'].setValue(this.products[index].price);  
      this.selectedProductID = this.products[index]._id;
      console.log(this.selectedCompany);
      }

      updateProduct(index): void{
        this.productService.updateProductById(this.productref.value, this.selectedProductID).subscribe(data=>console.log(data));
        this.listProductDiv = true;
        this.editProductDiv = false;
        location.reload();
      }
}