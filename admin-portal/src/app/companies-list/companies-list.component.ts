import { CompanyService } from './../services/company.service';
import { Company } from './../models/company';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatCurrency } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {

  companies: Company[];
  updateCompanyDiv: boolean = false;
  listCompany: boolean = true;
  selectedCompanyID: string;

companyref = new FormGroup({
  company: new FormControl
});

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(result => {
      this.companies = result;
      console.log(this.companies);
    })
  }
  addNewCompany():void{
    this.router.navigate(['/addNewCompany'])
  }

  deleteCompany(index): void{
this.companyService.deleteCompanyById(this.companies[index]._id).subscribe(data=>console.log(data));
location.reload();
  }
  editCompany(index): void{
this.listCompany = false;
this.updateCompanyDiv = true;
//this.companyref.setValue = this.companies[index].company;
this.companyref.controls['company'].setValue(this.companies[index].company);  
this.selectedCompanyID = this.companies[index]._id;
}

updateCompany(index): void{
  this.companyService.updateCompanyById(this.companyref.value, this.selectedCompanyID).subscribe(data=>console.log(data));
  this.listCompany = true;
  this.updateCompanyDiv = false;
  location.reload();
}


}
