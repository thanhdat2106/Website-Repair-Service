import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { DiaChi } from 'src/app/Models/DiaChi';
import { NhanVien } from 'src/app/Models/NhanVien';
import { PhuongXa } from 'src/app/Models/PhuongXa';
import { QuanHuyen } from 'src/app/Models/QuanHuyen';
import { TinhThanh } from 'src/app/Models/TinhThanh';
import { NhanvienServicesService } from 'src/app/Services/NhanVien/nhanvien-services.service';
import { PhuongxaService } from 'src/app/Services/PhuongXa/phuongxa.service';
import { QuanHuyenService } from 'src/app/Services/QuanHuyen/quan-huyen.service';
import { TinhthanhService } from 'src/app/Services/TinhThanh/tinhthanh.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  manv: number;
  FormNV: FormGroup;
  nhanvien: NhanVien;
  diachi: DiaChi;
  phuongxa: PhuongXa[];
  quanhuyen: QuanHuyen[];
  tinhthanh: TinhThanh[];
  isReadOnly : number;
  constructor(private nvServices: NhanvienServicesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private px: PhuongxaService,
    private qh: QuanHuyenService,
    private tt: TinhthanhService) { 
      
    }

  ngOnInit() {
    this.manv = this.route.snapshot.params['manv'];
    this.FormNV = this.formBuilder.group({
      tenNV: ['', Validators.required],
      cmnd: ['', Validators.required],
      sdt: [ '', Validators.required],
      soNha: ['', Validators.required],
      maPX: ['', Validators.required],
      maQH: ['', Validators.required],
      maTinh: ['', Validators.required],
      anh: ['', Validators.required],
      ngaySinh: ['', Validators.required],
      gioiTinh: [ '', Validators.required],
      ngayVL: ['', Validators.required],
      luong: ['', Validators.required],
      email: ['', Validators.required],
      password: [ '', Validators.required],
    });
    this.getByID();
    this.getTT();
    console.log(this.qh)
    this.isReadOnly =1
    this.FormNV.disable() ;
  }
  getByID()
  {
    this.nvServices.getByID(this.manv).subscribe(res=>{this.nhanvien=res
      this.FormNV.get("tenNV").setValue(res.tenNV);  
      this.FormNV.get("cmnd").setValue(res.cmnd);  
       this.FormNV.get("sdt").setValue(res.sdt);  
       this.FormNV.get("maPX").setValue(res.maPX);  
       this.FormNV.get("soNha").setValue(res.soNha); 
       this.FormNV.get("ngaySinh").setValue(res.ngaySinh);  
      this.FormNV.get("gioiTinh").setValue(res.gioiTinh);  
       this.FormNV.get("ngayVL").setValue(res.ngayVL);  
       this.FormNV.get("luong").setValue(res.luong); 
       this.FormNV.get("email").setValue(res.email);  
       this.FormNV.get("password").setValue(res.password); 
       this.px.getAllByID(res.maPX).subscribe(res=>
        {
          this.diachi = res[0];
          this.FormNV.get("maQH").setValue(res[0].maQH); 
          this.FormNV.get("maTinh").setValue(res[0].maTinh); 
          this.getQH(res[0].maTinh);
          this.getPX(res[0].maQH);
        })
        
        
    });
   
  }
  getTT()
  {
    this.tt.getAll().subscribe(res=> {this.tinhthanh= res})
  }
  getQH(id: number)
  {
    this.qh.getByID(id).subscribe(res=> {this.quanhuyen= res
    })
  }
  getPX(id: number)
  {
    this.px.getByID(id).subscribe(res=> {this.phuongxa= res})
  }
  onClickTinh(){
    console.log(this.FormNV.get("maTinh").value)
    this.getQH(this.FormNV.get("maTinh").value);
    this.getPX(this.quanhuyen[0].maQH);
  }
  onClickQuan()
  {
    this.getPX(this.FormNV.get("maQH").value);
  }
  //
  Edit(){
    if( this.isReadOnly ==1)
    {
      this.FormNV.enable();
      this.isReadOnly =2;
    }
    else{
      this.FormNV.disable();
      this.isReadOnly =1;
    }
  }
  onSubmit(){
    if( this.isReadOnly ==1)
    {
      
    }
    else{
     this.nhanvien.tenNV = this.FormNV.get("tenNV").value;
     this.nhanvien.cmnd =this.FormNV.get("cmnd").value;  
     this.nhanvien.sdt = this.FormNV.get("sdt").value;  
     this.nhanvien.maPX= Number(this.FormNV.get("maPX").value);  
     this.nhanvien.soNha = this.FormNV.get("soNha").value;  
     this.nhanvien.ngaySinh = this.FormNV.get("ngaySinh").value;  
     this.nhanvien.gioiTinh = this.FormNV.get("gioiTinh").value;   
     this.nhanvien.ngayVL= this.FormNV.get("ngayVL").value;  
     this.nhanvien.luong = this.FormNV.get("luong").value;  
     this.nhanvien.email= this.FormNV.get("email").value;  
     this.nhanvien.password = this.FormNV.get("password").value;  
     console.log(this.nhanvien)
     this.nvServices.Put(this.nhanvien).subscribe(
       ()=>{
        this.FormNV.disable();
        this.isReadOnly =1;
       }
     );
     
    }
  }
}
