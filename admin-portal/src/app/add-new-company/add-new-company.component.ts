import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-add-new-company',
  templateUrl: './add-new-company.component.html',
  styleUrls: ['./add-new-company.component.css']
})
export class AddNewCompanyComponent implements OnInit {

  companyref = new FormGroup({
    company: new FormControl
  }); 

  result:string;

  constructor(public comService: CompanyService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewCompany():void{
    this.comService.addCompany(this.companyref.value).subscribe(data=>{

      this.router.navigate(['/companies-list']);
      
    },
    (err) => {this.result = err});
  }

}
