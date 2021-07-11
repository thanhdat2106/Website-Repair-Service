import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NhanVien } from 'src/app/Models/NhanVien';
import { NhanvienServicesService } from 'src/app/Services/NhanVien/nhanvien-services.service';
import { DialogNhanVien } from './dialog_nhanvien.component';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit {
  macv : number
  listnhanvien: NhanVien[]
  nv: NhanVien;
  
  displayedColumns: string[] = ['tenNV','ngayVL','sdt','soNha','luong','gioiTinh','maNV'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private nhanvien: NhanvienServicesService,public dialog: MatDialog, private router: Router) { 
    try{
      this.macv=this.router.getCurrentNavigation().extras.state.macv;
    }
    catch{
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit() {
      this.loadnhanvien(); 
   
    
   
  }
  dataSource = new MatTableDataSource();
  loadnhanvien()
  {
    this.nhanvien.getAll().subscribe(res=>{
      this.dataSource= new MatTableDataSource<NhanVien>(res)
      this.dataSource.sort = this.sort;
      console.log(res)
      // phan trang
      this.dataSource.paginator = this.paginator;
      });
  }
  openDialog(id: number) {
    this.router.navigate(['admin/DialogNhanVien/',id]);
    //console.log(this.kh)
  
}
deleteNhanvien(ma: number)
  {
    if (confirm("Are you sure you want to delete this ?")) { 
      this.calldelete(ma);
      this.loadnhanvien();
      }
  }
  calldelete(id: number)
  {
    this.nhanvien.Delete(id).subscribe(()=>
    {
      this.loadnhanvien(); 
    });
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
