import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ChucVu } from "src/app/Models/ChucVu";
import { NhanVien } from "src/app/Models/NhanVien";
import { PhuongXa } from "src/app/Models/PhuongXa";
import { QuanHuyen } from "src/app/Models/QuanHuyen";
import { TinhThanh } from "src/app/Models/TinhThanh";
import { NhanvienServicesService } from "src/app/Services/NhanVien/nhanvien-services.service";
import { PhuongxaService } from "src/app/Services/PhuongXa/phuongxa.service";
import { QuanHuyenService } from "src/app/Services/QuanHuyen/quan-huyen.service";
import { TinhthanhService } from "src/app/Services/TinhThanh/tinhthanh.service";

@Component({
    selector: 'DialogNhanVien',
    templateUrl: 'dialog_nhanvien.component.html',
  })
  export class DialogNhanVien implements OnInit{
    FormNV : FormGroup
    Form:FormGroup
    anh: string
    listNhanVien : NhanVien[]
    nhanvien: NhanVien;
    phuongxa: PhuongXa[];
    quanhuyen: QuanHuyen[];
    tinhthanh: TinhThanh[];
    isReadOnly : number;
    manv: number;
    chucvu : ChucVu[];
    isVisible = false;
    constructor(
      private formBuilder: FormBuilder,
      private nv: NhanvienServicesService,
      private px: PhuongxaService,
      private qh: QuanHuyenService,
    private tt: TinhthanhService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    ) {}
    ngOnInit(){
      this.manv =  this.route.snapshot.params['id'];
      this.Form = this.formBuilder.group({
        tenNV: ['', Validators.required],
        maCV: ['', Validators.required],
        maPX: ['', Validators.required],
        soNha: ['', Validators.required],
        sdt: ['', Validators.required],
        email: ['', Validators.required],
        anh: ['', Validators.required],
        gioiTinh: ['', Validators.required],
        ngaySinh: [ '', Validators.required],
        ngayVL: [ '', Validators.required],
        luong: [ '', Validators.required],
        cmnd: [ '', Validators.required],
        password: [ '', Validators.required],
      });
        this.FormNV = this.formBuilder.group({
            tenNV: ['', Validators.required],
            maCV: ['', Validators.required],
            maPX: ['', Validators.required],
            soNha: ['', Validators.required],
            maQH: ['', Validators.required],
            maTinh: ['', Validators.required],
            sdt: ['', Validators.required],
            email: ['', Validators.required],
            anh: ['', Validators.required],
            gioiTinh: ['', Validators.required],
            ngaySinh: [ '', Validators.required],
            ngayVL: [ '', Validators.required],
            luong: [ '', Validators.required],
            cmnd: [ '', Validators.required],
            password: [ '', Validators.required],
          });
           
           if (this.manv == 0) {
            this.getTT();
            this.getChucVu();
             }
           else{
            this.getByID();
            this.getTT();
            this.getChucVu();
           }
           
        //   console.log(this.data.tenKH)
    }
    getByID()
    {
        this.nv.getByID(this.manv).subscribe(res=>{this.nhanvien=res
        this.FormNV.get("tenNV").setValue(this.nhanvien.tenNV);  
        this.FormNV.get("maCV").setValue(this.nhanvien.maCV);  
        this.FormNV.get("maPX").setValue(this.nhanvien.maPX);  
        this.FormNV.get("soNha").setValue(this.nhanvien.soNha);  
         this.FormNV.get("sdt").setValue(this.nhanvien.sdt);  
         this.FormNV.get("anh").setValue(this.nhanvien.anh); 
         this.FormNV.get("luong").setValue(this.nhanvien.luong);  
         this.FormNV.get("ngayVL").setValue(this.nhanvien.ngayVL); 
         this.FormNV.get("ngaySinh").setValue(this.nhanvien.ngaySinh); 
         this.FormNV.get("email").setValue(this.nhanvien.email);  
         this.FormNV.get("cmnd").setValue(this.nhanvien.cmnd); 
         this.FormNV.get("gioiTinh").setValue(this.nhanvien.gioiTinh); 
         this.FormNV.get("password").setValue(this.nhanvien.password); 
         this.px.getAllByID(this.nhanvien.maPX).subscribe(res=>
          {
            console.log(res)
          this.FormNV.get("maQH").setValue(res[0].maQH); 
          this.FormNV.get("maTinh").setValue(res[0].maTinh); 
          this.getQH(res[0].maTinh);
          this.getPX(res[0].maQH);
          })
        
        this.anh =this.nhanvien.anh;
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
      this.getQH(this.FormNV.get("maTinh").value);
    }
    onClickQuan()
    {
      this.getPX(this.FormNV.get("maQH").value);
    }
    onSubmit(){ 
      this.createnhanvien(this.nhanvien);
      }
       createnhanvien(itemNhanVien: NhanVien)
       {
         if (this.manv == 0) {                 
          this.Form.get("tenNV").setValue ( this.FormNV.get("tenNV").value)
          this.Form.get("cmnd").setValue ( this.FormNV.get("cmnd").value)
          this.Form.get("sdt").setValue ( this.FormNV.get("sdt").value)
          this.Form.get("maCV").setValue ( Number(this.FormNV.get("maCV").value))
          this.Form.get("maPX").setValue ( Number(this.FormNV.get("maPX").value))
          this.Form.get("soNha").setValue ( this.FormNV.get("soNha").value)
          this.Form.get("ngaySinh").setValue ( this.FormNV.get("ngaySinh").value)
          this.Form.get("gioiTinh").setValue ( this.FormNV.get("gioiTinh").value)
          this.Form.get("ngayVL").setValue ( this.FormNV.get("ngayVL").value)
          this.Form.get("luong").setValue ( Number(this.FormNV.get("luong").value))
          this.Form.get("email").setValue ( this.FormNV.get("email").value)
          this.Form.get("anh").setValue ( this.FormNV.get("anh").value)
          this.Form.get("password").setValue ("123")
          this.nhanvien = this.Form.value
          try{
             this.nv.Post(this.nhanvien).subscribe( () => {     
                 this.router.navigate(['admin/NhanVien']);
                 this._snackBar.open("Bạn đã thêm thành công", "OK", {
                  duration: 2000,
                });
               }  
             );  
              }catch{
                this._snackBar.open("Thêm không thành công, kiểm tra email và số điện thoại đã được dùng", "OK", {
                  duration: 2000,
                });
              }
           } else {  
            this.FormNV.get("maCV").setValue ( Number(this.FormNV.get("maCV").value))
            this.nhanvien.tenNV = this.FormNV.get("tenNV").value;
            this.nhanvien.cmnd =this.FormNV.get("cmnd").value;  
            this.nhanvien.sdt = this.FormNV.get("sdt").value;  
            this.nhanvien.maCV = this.FormNV.get("maCV").value;  
            this.nhanvien.maPX= Number(this.FormNV.get("maPX").value);  
            this.nhanvien.soNha = this.FormNV.get("soNha").value;  
            this.nhanvien.ngaySinh = this.FormNV.get("ngaySinh").value;  
            this.nhanvien.gioiTinh = this.FormNV.get("gioiTinh").value;   
            this.nhanvien.ngayVL= this.FormNV.get("ngayVL").value;  
            this.nhanvien.luong = this.FormNV.get("luong").value;  
            this.nhanvien.email= this.FormNV.get("email").value;  
            this.nhanvien.anh= this.FormNV.get("anh").value;  
            this.nhanvien.password = this.FormNV.get("password").value; 
            // this.FormNV.get("maCV").setValue ( Number(this.FormNV.get("maCV").value))
            // this.FormNV.get("maPX").setValue ( Number(this.FormNV.get("maPX").value))
            // this.FormNV.get("luong").setValue ( Number(this.FormNV.get("luong").value))
            // this.nhanvien = this.FormNV.value;
            this.nv.Put(this.nhanvien).subscribe(
              ()=>{
               this._snackBar.open("Bạn đã chỉnh sửa thành công", "OK", {
                 duration: 2000,
               });
              }
            );
           }  
       }
       
      
      getChucVu(){
        this.nv.getChucVu().subscribe(res=>{this.chucvu = res})
      }
      onFileChange(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
          let file = event.target.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.anh = file.name
            this.FormNV.get('anh').setValue(this.anh)
          };
        }
      }
      onBack(){
        this.router.navigate(['admin/NhanVien'], { state: { macv: 1 } });
      }
    
}