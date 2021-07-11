import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NhanVien } from 'src/app/Models/NhanVien';
import { NhanvienServicesService } from 'src/app/Services/NhanVien/nhanvien-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  addForm: FormGroup;
  allNhanVien: NhanVien[];
  report: string;
  nhanvien: NhanVien;
  manv: number;
  constructor(private router: Router, private nvService: NhanvienServicesService,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      
    });
    this.getALL();
  }
  getALL()
  {
    this.nvService.getAll().subscribe(res=>{this.allNhanVien=res
    })

    
  }
  onSubmit(){
    const account =this.allNhanVien.filter(res =>res.email==this.addForm.get("email").value && res.password==this.addForm.get("password").value )
    this.nhanvien = this.allNhanVien.find(res => res.email==this.addForm.get("email").value)
    this.manv = this.nhanvien.maNV
   if(account.toString()=="")
  {
    this.report =" Your userame or password is  incorrect" 
  }else
  {
   this.router.navigate(['admin'], { state: { manv: this.nhanvien.maNV, macv: this.nhanvien.maCV } });
   //this.router.navigate(['web'])
  }
   
  }
}
