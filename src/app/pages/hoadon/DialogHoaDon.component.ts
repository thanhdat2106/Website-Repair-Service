import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterLinkActive } from "@angular/router";
import { ChiTietHoaDon } from "src/app/Models/ChiTietHoaDon";
import { CTHD } from "src/app/Models/CTHD";
import { HoaDon } from "src/app/Models/HoaDon";
import { DichvuServicesService } from "src/app/Services/DichVu/dichvu-services.service";
import { HoadonService } from "src/app/Services/HoaDon/hoadon.service";
import { KhachhangServicesService } from "src/app/Services/KhachHang/khachhang-services.service";
import { ThosuaServicesService } from "src/app/Services/ThoSua/thosua-services.service";
@Component({
    selector: 'DialogHoaDon',
    templateUrl: 'DialogHoaDon.component.html',
  })
  export class DialogHoaDon implements OnInit{
    FormHD : FormGroup
    listcthd: Array<CTHD>= []
    list: Array<ChiTietHoaDon>=[]
    maHD: number;
    constructor(
      private formBuilder: FormBuilder,
      private khservice: KhachhangServicesService,
      private tsservice: ThosuaServicesService,
      private dvservice: DichvuServicesService,
      private hdservice : HoadonService,
      private route : ActivatedRoute,
      private router: Router
     ) {}
    ngOnInit(){
      this.maHD =  this.route.snapshot.params['id'];
        this.FormHD = this.formBuilder.group({
            maHD: ['', Validators.required],
            maKH: ['', Validators.required],
            ngayLap: ['', Validators.required],
            chietKhau: ['', Validators.required],
            thueVAT: ['', Validators.required],
            phiDiChuyen: ['', Validators.required],
            phiDichVu: ['', Validators.required],
            tongTien: ['', Validators.required],
            trangThai: ['', Validators.required],
            thanhTien: ['', Validators.required],
            hanBaoHanh:  ['', Validators.required],
            tenDV: ['', Validators.required],
            tenKH: ['', Validators.required],
            tenTho: ['', Validators.required],
            diemDGKhachHang:['', Validators.required],
            nhanXetKhachHang: ['', Validators.required],
            diemDGTho: ['', Validators.required],
            nhanXetTho: ['', Validators.required],
          });
          this.getByID();
          console.log(this.FormHD.value)
          this.FormHD.disable()
    }
    getByID()
    {
        this.hdservice.getByID(this.maHD).subscribe(res=> {
         this.FormHD.get("maHD").setValue(res.maHD);  
         this.FormHD.get("maKH").setValue(res.maKH);  
         this.FormHD.get("ngayLap").setValue(res.ngayLap);  
         this.FormHD.get("chietKhau").setValue(res.chietKhau); 
         this.FormHD.get("thueVAT").setValue(res.thueVAT);  
         this.FormHD.get("phiDiChuyen").setValue(res.phiDiChuyen+" VNĐ"); 
         this.FormHD.get("phiDichVu").setValue(res.phiDichVu +" VNĐ");  
         this.FormHD.get("tongTien").setValue(res.tongTien+" VNĐ"); 
        
         if(res.trangThai==0)
         {
          this.FormHD.get("trangThai").setValue("Chưa thanh toán");
         }else if(res.trangThai==1)
         {
          this.FormHD.get("trangThai").setValue("Đã thanh toán");
         }else{
          this.FormHD.get("trangThai").setValue("Đã hủy đơn");
         }
        this.khservice.getByID(res.maKH).subscribe(res=>{
          this.FormHD.get("tenKH").setValue(res.tenKH); 
        })
        this.hdservice.getCTHDByID(res.maHD).subscribe(res=>{
          this.listcthd= res
            this.FormHD.get("tenTho").setValue(res[0].tenTho); 
            console.log(this.listcthd)
        })
        this.hdservice.getDanhGia(res.maHD).subscribe(res=>{
          this.FormHD.get("diemDGKhachHang").setValue(res.diemDGKhachHang);
          this.FormHD.get("nhanXetKhachHang").setValue(res.nhanXetKhachHang);
          this.FormHD.get("nhanXetTho").setValue(res.nhanXetTho);
          this.FormHD.get("diemDGTho").setValue(res.diemDGTho);
        })
      })
    }
    onBack(){
      this.router.navigate(['admin/HoaDon']);
    }
  }