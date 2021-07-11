import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { KhachHang } from "src/app/Models/KhachHang";
import { NhanvienServicesService } from "src/app/Services/NhanVien/nhanvien-services.service";
import { PhuongxaService } from "src/app/Services/PhuongXa/phuongxa.service";

@Component({
    selector: 'DialogKhachHang',
    templateUrl: 'DialogKhachHang.component.html',
  })
  export class DialogKhachHang implements OnInit{
    FormNV : FormGroup
    anh: string
    constructor(
      public dialogRef: MatDialogRef<DialogKhachHang>,
      private formBuilder: FormBuilder,
      private nv: NhanvienServicesService,
      private px: PhuongxaService,
      @Inject(MAT_DIALOG_DATA) public data: KhachHang) {}
  
    onNoClick() {
   
      this.dialogRef.close();
    }
    ngOnInit(){
        this.FormNV = this.formBuilder.group({
            tenKH: ['', Validators.required],
            soNha: ['', Validators.required],
            tenPX: ['', Validators.required],
            tenQH: ['', Validators.required],
            tenTinh: ['', Validators.required],
            sdt: ['', Validators.required],
            email: ['', Validators.required],
            anh: ['', Validators.required],
            diemDanhGia: ['', Validators.required],
            diemTichLuy: [ '', Validators.required],
            password: [ '', Validators.required],
          });
          this.getByID();
          console.log(this.FormNV.get("tenKH").value)
    }
    getByID()
    {
        this.FormNV.get("tenKH").setValue(this.data.tenKH);  
        this.FormNV.get("soNha").setValue(this.data.soNha);  
         this.FormNV.get("sdt").setValue(this.data.sdt);  
         this.FormNV.get("anh").setValue(this.data.anh); 
         this.FormNV.get("diemTichLuy").setValue(this.data.diemTichLuy);  
         this.FormNV.get("diemDanhGia").setValue(this.data.diemDanhGia); 
         this.FormNV.get("email").setValue(this.data.email);  
         this.FormNV.get("password").setValue(this.data.password); 
         this.px.getAllByID(this.data.maPX).subscribe(res=>
          {
            this.FormNV.get("tenQH").setValue(res[0].tenQH); 
            this.FormNV.get("tenTinh").setValue(res[0].tenTinh); 
            this.FormNV.get("tenPX").setValue(res[0].tenPX);  
          })
        this.anh =this.data.anh;
     
    }
  }