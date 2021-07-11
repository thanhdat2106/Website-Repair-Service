import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HoaDon } from 'src/app/Models/HoaDon';
import { HoadonService } from 'src/app/Services/HoaDon/hoadon.service';
import { isThisTypeNode } from 'typescript';
import { DialogHoaDon } from './DialogHoaDon.component';
interface Ngay {
  ngayBD: Date;
  ngayKT: Date;
}
@Component({
  selector: 'app-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css']
})
export class HoadonComponent implements OnInit {
  HD: HoaDon
  addForm: FormGroup
  FormSearch: FormGroup
  ngay: Ngay
  hoadon:HoaDon[]=[]
  hoadon1:HoaDon[]=[]
  displayedColumns: string[] = ['maKH','ngayLap','chietKhau','thueVAT','phiDiChuyen','phiDichVu','tongTien','trangThai','maHD'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    private hdservice:HoadonService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.FormSearch = this.formBuilder.group({
      ngayBD: ['', Validators.required],
      ngayKT: ['', Validators.required],
    })
    this.addForm = this.formBuilder.group({
      //employeeID: [],
      maHD: ['', Validators.required],
      maKH: ['', Validators.required],
      ngayLap: ['', Validators.required],
      chietKhau: ['', Validators.required],
      thueVAT: ['', Validators.required],
      phiDiChuyen: ['', Validators.required],
      phiDichVu: ['', Validators.required],
      tongTien: ['', Validators.required],
      trangThai: ['', Validators.required],
    });
    this.loadHoaDon()
    
  }
  dataSource = new MatTableDataSource<HoaDon>();
  loadHoaDon()
  {
    this.hdservice.getAll().subscribe(res=>{
      this.hoadon1 = res;
      for(var i=0; i< res.length;i++)
      {
        res[i].maKH= i;
        
      }
      this.dataSource= new MatTableDataSource<HoaDon>(res)
      
      this.dataSource.sort = this.sort;
     // console.log(res)
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
    // this.hdservice.getByID(id).subscribe(res=> {this.HD= res
    //   const dialogRef = this.dialog.open(DialogHoaDon, {
    //     width: '80%',
    //     data: res
    // });
    // console.log(res)
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.HD = result;
    // });
    this.router.navigate(['admin/DialogHoaDon/',id]);
   
    
  
}
transformDate(date) {
  this.datePipe.transform(date, 'dd-MM-yyyy'); //whatever format you need. 
}
onSubmit(){
  this.ngay = this.FormSearch.value;
  const ngayBD = new Date(this.FormSearch.get("ngayBD").value)
  const ngayKT = new Date(this.FormSearch.get("ngayKT").value)
  this.hoadon=[]
  this.dataSource.data = this.hoadon1
   this.dataSource.data.find(res=>{
     const ngaylap = new Date(res.ngayLap)
    if( ngaylap.getTime()> ngayBD.getTime()&& ngaylap.getTime()<ngayKT.getTime())
    {
      this.hoadon.push(res)
    }
    
  })
  console.log(this.hoadon)
  this.dataSource= new MatTableDataSource<HoaDon>(this.hoadon)
  this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
}
reset(){
  this.FormSearch.reset()
  this.loadHoaDon()
}

}
