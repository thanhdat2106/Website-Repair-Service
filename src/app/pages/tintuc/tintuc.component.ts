import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TinTuc } from 'src/app/Models/TinTuc';
import { TinTucLoaiDV } from 'src/app/Models/TinTucLoaiDV';
import { TintucServicesService } from 'src/app/Services/TinTuc/tintuc-services.service';
import { DialogTinTuc } from './DialogTinTuc.component';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent implements OnInit {

  tt: TinTuc
  displayedColumns: string[] = ['tieuDe','ngayDang','tacGia','tenLoaiDV','maTT'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private tintucdv:TintucServicesService,
    private formBuilder: FormBuilder,
    private router: Router ) { }


  ngOnInit() {
    this.loadTinThuc();
  }
  dataSource = new MatTableDataSource();
  loadTinThuc()
  {
    this.tintucdv.getAll().subscribe(res=>{
      this.dataSource= new MatTableDataSource<TinTucLoaiDV>(res)
      this.dataSource.sort = this.sort;
      // phan trang
      this.dataSource.paginator = this.paginator;
      });
     
  }
  openDialog(id: number) {
    this.router.navigate(['admin/DialogTinTuc/',id]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
