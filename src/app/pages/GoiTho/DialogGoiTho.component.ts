import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLinkActive } from "@angular/router";
import { UpdateGoiTho } from "src/app/Models/UpdateGoiTho";
import { HoaDon } from "src/app/Models/HoaDon";
import { GoithoService } from "src/app/Services/GoiTho/goitho.service";
import { HoadonService } from "src/app/Services/HoaDon/hoadon.service";
import { ChiTietHoaDon } from "src/app/Models/ChiTietHoaDon";
import { GoiTho_TT } from "src/app/Models/GoiTho_TT";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatAccordion } from "@angular/material/expansion";
import { MatTableDataSource } from "@angular/material/table";
import { ThoSua } from "src/app/Models/ThoSua";
import { PhuongxaService } from "src/app/Services/PhuongXa/phuongxa.service";
@Component({
    selector: 'DialogGoiTho',
    templateUrl: 'DialogGoiTho.component.html',
})
export class DialogGoiTho implements OnInit {
    FormGT: FormGroup
    addForm: FormGroup
    // listcthd: Array<CTHD>= []
    // list: Array<ChiTietHoaDon>=[]
    maGT: number;
    maKH: number;
    maTho:number
    dichvu = [];
    madichvu =[];
    ThoSua: ThoSua[]=[];
    GoiTho1:GoiTho_TT
    ktsave = false
    GoiTho: UpdateGoiTho
    hd: HoaDon
    cthd: ChiTietHoaDon
    thue = 0.1
    displayedColumns: string[] = ['maTho','tenTho','sdt','soNha'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
    constructor(
        private formBuilder: FormBuilder,
        private gtServices: GoithoService,
        //   private tsservice: ThosuaServicesService,
        //   private dvservice: DichvuServicesService,
         private hdservice : HoadonService,
        private pxservice: PhuongxaService,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) { }
    ngOnInit() {
        this.maGT = this.route.snapshot.params['id'];
        this.FormGT = this.formBuilder.group({
            maGT: ['', Validators.required],
            maKH: ['', Validators.required],
            ngayGoi: ['', Validators.required],
            ghiChu: ['', Validators.required],
            trangThai: ['', Validators.required],
            tenKH: ['', Validators.required],
            sdt: ['', Validators.required],
            maDV: ['', Validators.required],
            tenDV: ['', Validators.required],
            diaChi: ['', Validators.required],
            maTho: ['', Validators.required],
        });
        this.getByID();
        //       console.log(this.FormHD.value)
        //       this.FormHD.disable()
    }
    dataSource = new MatTableDataSource<ThoSua>();
    getByID() {
        this.gtServices.getTT(this.maGT).subscribe(res => {
            
            this.FormGT.get("maGT").setValue(res[0].maGT);
            this.FormGT.get("maKH").setValue(res[0].maKH);
            this.FormGT.get("ngayGoi").setValue(res[0].ngayGoi);
            this.FormGT.get("ghiChu").setValue(res[0].ghiChu);
            this.FormGT.get("tenKH").setValue(res[0].tenKH);
            this.FormGT.get("sdt").setValue(res[0].sdt);
            this.FormGT.get("maDV").setValue(res[0].maDV);
            //this.FormGT.get("tenDV").setValue(res[0].tenDV); 
            this.FormGT.get("diaChi").setValue(res[0].soNha);
           
            console.log(res[0].maKH)
            for (var i = 0; i < res.length; i++) {
                this.dichvu.push(res[i].tenDV.toString());
                this.madichvu.push(res[i].maDV)
            }
            if (res[0].trangThai == 0) {
                this.FormGT.get("trangThai").setValue("Chưa có thợ nhận");
                this.gtServices.GetByGT(this.maGT).subscribe(res => {
                    this.ThoSua = res
                    this.dataSource= new MatTableDataSource<ThoSua>(res)
                })
            } else {
                this.FormGT.get("trangThai").setValue("Đã có thợ nhận");
                this.ktsave = true
            }
           
        })
    }
    onBack() {
        this.router.navigate(['admin/GoiTho']);
    }
}