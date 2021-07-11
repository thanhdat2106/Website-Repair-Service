import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaiDV } from 'src/app/Models/LoaiDV';
import { PhuongXa } from 'src/app/Models/PhuongXa';
import { QuanHuyen } from 'src/app/Models/QuanHuyen';
import { ThoSua } from 'src/app/Models/ThoSua';
import { Tho_DichVu } from 'src/app/Models/Tho_DichVu';
import { TinhThanh } from 'src/app/Models/TinhThanh';
import { LoaidvServicesService } from 'src/app/Services/LoaiDV/loaidv-services.service';
import { PhuongxaService } from 'src/app/Services/PhuongXa/phuongxa.service';
import { QuanHuyenService } from 'src/app/Services/QuanHuyen/quan-huyen.service';
import { ThosuaServicesService } from 'src/app/Services/ThoSua/thosua-services.service';
import { ThoDichvuService } from 'src/app/Services/Tho_DichVu/tho-dichvu.service';
import { TinhthanhService } from 'src/app/Services/TinhThanh/tinhthanh.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
    selector: 'DialogThoSua',
    templateUrl: 'DialogThoSua.component.html',
    providers: [{
      provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
    }]
  })
  export class DialogThoSua implements OnInit {
      loaidichvu: LoaiDV[]
      FormTS: FormGroup;
      phuongxa: PhuongXa[];
  quanhuyen: QuanHuyen[];
  tinhthanh: TinhThanh[];
  isReadOnly : boolean;
  thodv: Tho_DichVu[];
   tho :  ThoSua;
   thosua: ThoSua;
   anh:string;
  public isVisible: boolean = false;
    constructor(
      public dialogRef: MatDialogRef<DialogThoSua>,
      @Inject(MAT_DIALOG_DATA) public data: ThoSua,
      private formBuilder: FormBuilder,
      private loaidv: LoaidvServicesService,
      private ts: ThosuaServicesService,
      private px: PhuongxaService,
      private qh: QuanHuyenService,
      private tt: TinhthanhService,
      private tdv: ThoDichvuService,
      private router: Router,
      ) {}
      
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit() {
      
      this.FormTS = this.formBuilder.group({
        tenTho: ['', Validators.required],
        soNha: ['', Validators.required],
        maPX: ['', Validators.required],
        maQH: ['', Validators.required],
        maTinh: ['', Validators.required],
        sdt: ['', Validators.required],
        email: ['', Validators.required],
        anh: ['', Validators.required],
        diemDanhGia: ['', Validators.required],
        password: [ '', Validators.required],
        active:  [ '', Validators.required],
        soDu:  [ '', Validators.required],
        soTaiKhoan:  [ '', Validators.required],
        loaiTho:  [ '', Validators.required],
      });
      this.getdichvu();
      this.getTT();
      this.load();
      this.getDichVu();
      this.FormTS.disable()
      
    }
    getdichvu()
    {
        this.loaidv.getAll().subscribe(res=>{this.loaidichvu= res})
    }
    load(){
      if(this.data !=null)
      {
        this.getByID()
      }else
      {
      }
    }
    getByID()
    {
      console.log(this.data)
      this.thosua = this.data
        this.FormTS.get("tenTho").setValue(this.data.tenTho);  
        this.FormTS.get("soNha").setValue(this.data.soNha);  
         this.FormTS.get("sdt").setValue(this.data.sdt);  
         this.FormTS.get("maPX").setValue(this.data.maPX);  
        //this.FormTS.get("anh").setValue(this.data.anh);  
         this.FormTS.get("email").setValue(this.data.email);  
         this.FormTS.get("password").setValue(this.data.password); 
         this.FormTS.get("diemDanhGia").setValue(this.data.diemDanhGia); 
         this.FormTS.get("soTaiKhoan").setValue(this.data.soTaiKhoan); 
         this.FormTS.get("soDu").setValue(this.data.soDu); 
         this.FormTS.get("loaiTho").setValue(this.data.loaiTho); 
         this.FormTS.get("active").setValue(this.data.active); 
         this.anh = this.data.anh
         this.px.getAllByID(this.data.maPX).subscribe(res=>
          {
        
            this.FormTS.get("maQH").setValue(res[0].maQH); 
            this.FormTS.get("maTinh").setValue(res[0].maTinh); 
            this.getQH(res[0].maTinh);
            this.getPX(res[0].maQH);
          })
          this.ktActive()
          this.ktloaiTho()
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
    console.log(this.FormTS.get("maTinh").value)
    this.getQH(this.FormTS.get("maTinh").value);
    this.getPX(this.quanhuyen[0].maQH);
  }
  onClickQuan()
  {
    this.getPX(this.FormTS.get("maQH").value);
  }
  getDichVu(){
    this.tdv.getByID(this.data.maTho).subscribe(res=>{this.thodv= res});
  }
  updatetho(){
    if(this.FormTS.get("active").value == true)
    {
     this.thosua.active = 0
     
    }
    else{
      this.thosua.active=1
    }
   this.thosua.maTho = Number(this.data.maTho);
    this.ts.Put(this.thosua).subscribe(()=>{
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
    
    })
  }
  updateloaiTho(){
    if(this.FormTS.get("loaiTho").value == true)
    {
     this.thosua.loaiTho = 0
    }
    else{
      this.thosua.loaiTho=1
    }
   this.thosua.maTho = Number(this.data.maTho);
   console.log("dat")
    this.ts.Put(this.thosua).subscribe(()=>{
      if (this.isVisible) { 
        return;
      } 
      this.isVisible = true;
      setTimeout(()=> this.isVisible = false,2500)
    
    })
  }
  ktActive()
  {
    console.log(this.FormTS.get("active").value)
    if(this.FormTS.get("active").value == 1)
    {
      this.FormTS.get("active").setValue(true)  
    }
    else{
      this.FormTS.get("active").setValue(false)  
    }
  }
  ktloaiTho()
  {
    console.log(this.FormTS.get("loaiTho").value)
    if(this.FormTS.get("loaiTho").value == 1)
    {
      this.FormTS.get("loaiTho").setValue(true)  
    }
    else{
      this.FormTS.get("loaiTho").setValue(false)  
    }
  }
  Edit(){
    if(this.FormTS.disabled)
    {
      this.FormTS.enable()
    }else
    {
      this.FormTS.disable()
    }
  }
  Save(){
    this.thosua.tenTho=this.FormTS.get("tenTho").value;  
    this.thosua.soNha=this.FormTS.get("soNha").value;  
    this.thosua.sdt=this.FormTS.get("sdt").value;  
    this.thosua.maPX= Number(this.FormTS.get("maPX").value);  
    this.thosua.anh=this.FormTS.get("anh").value;  
    this.thosua.email=this.FormTS.get("email").value;  
    this.thosua.password= this.FormTS.get("password").value; 
    this.thosua.diemDanhGia=Number(this.FormTS.get("diemDanhGia").value); 
    this.thosua.soTaiKhoan=this.FormTS.get("soTaiKhoan").value; 
    this.thosua.soDu=Number(this.FormTS.get("soDu").value); 
    this.ts.Put(this.thosua).subscribe(
      ()=>{
       this.FormTS.disable();
      }
    );
  }
  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.anh = file.name
        this.FormTS.get('anh').setValue(this.anh)
      };
    }
  }
  Print(){
    this.onNoClick();
    this.router.navigate(['admin/ReportHopDong/',this.data.maTho]);
  }
  }