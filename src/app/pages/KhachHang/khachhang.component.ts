import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KhachHang } from 'src/app/Models/KhachHang';
import { KhachhangServicesService } from 'src/app/Services/KhachHang/khachhang-services.service';
import { NhanvienServicesService } from 'src/app/Services/NhanVien/nhanvien-services.service';
import { PhuongxaService } from 'src/app/Services/PhuongXa/phuongxa.service';
import { DialogKhachHang } from './DialogKhachHang.component';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css']
})
export class KhachhangComponent implements OnInit {
  kh: KhachHang
  addForm: FormGroup
  displayedColumns: string[] = ['tenKH','soNha','sdt','email','diemTichLuy','diemDanhGia','maKH'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private khachhangdv:KhachhangServicesService,private formBuilder: FormBuilder,public dialog: MatDialog) { }

  ngOnInit(){
    this.addForm = this.formBuilder.group({
      //employeeID: [],
      tenKH: ['', Validators.required],
      soNha: ['', Validators.required],
      sdt: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      diemTichLuy: ['', Validators.required],
      diemDanhGia: ['', Validators.required],
      anh: ['', Validators.required],
     
    });
    this.loadKhachHang();
  }
  dataSource = new MatTableDataSource();
  loadKhachHang()
  {
    this.khachhangdv.getAll().subscribe(res=>{
      this.dataSource= new MatTableDataSource<KhachHang>(res)
      this.dataSource.sort = this.sort;
      console.log(res)
      // phan trang
      this.dataSource.paginator = this.paginator;
      });
     
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(id: number) {
    this.khachhangdv.getByID(id).subscribe(res=> {this.kh= res
      const dialogRef = this.dialog.open(DialogKhachHang, {
        width: '80%',
        data: this.kh,
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.kh = result;
    });
    });
    console.log(this.kh)
  
}
}
