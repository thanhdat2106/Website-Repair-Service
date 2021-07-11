import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GoiTho } from 'src/app/Models/GoiTho';
import { GoithoService } from 'src/app/Services/GoiTho/goitho.service';

@Component({
  selector: 'app-goitho',
  templateUrl: './goitho.component.html',
  styleUrls: ['./goitho.component.css']
})
export class GoithoComponent implements OnInit {
  addForm: FormGroup
  FormSearch:FormGroup
  goitho:GoiTho[]=[]
  goitho1:GoiTho[]=[]
  
  displayedColumns: string[] = ['maKH','ngayGoi','ghiChu','tenKH','sdt','trangThai','maGT'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    private gtService:GoithoService,
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
      maGT: ['', Validators.required],
      maKH: ['', Validators.required],
      ngayGoi: ['', Validators.required],
      ghiChu: ['', Validators.required],
      trangThai: ['', Validators.required],
      tenKH: ['', Validators.required],
      sdt: ['', Validators.required],
    });
    this.loadGoiTho()
    
  }
  dataSource = new MatTableDataSource<GoiTho>();
  loadGoiTho()
  {
    this.gtService.getAll().subscribe(res=>{
      this.goitho1 = res
      for(var i=0; i< res.length;i++)
      {
        res[i].maKH= i;
        
      }
      this.dataSource= new MatTableDataSource<GoiTho>(res)
      
      this.dataSource.sort = this.sort;
     // console.log(res)
      // phan trang
      this.dataSource.paginator = this.paginator;
      });
     
  }
  openDialog(id: number) {
    this.router.navigate(['admin/DialogGoiTho/',id]);
   
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
onSubmit(){
  const ngayBD = new Date(this.FormSearch.get("ngayBD").value)
  const ngayKT = new Date(this.FormSearch.get("ngayKT").value)
  console.log(ngayKT)
  this.goitho=[]
  this.dataSource.data = this.goitho1
   this.dataSource.data.find(res=>{
     const ngaygoi = new Date(res.ngayGoi)
    if( ngaygoi.getTime()>= ngayBD.getTime()&& ngaygoi.getTime()<=ngayKT.getTime())
    {
      this.goitho.push(res)
    }
    
  })
  this.dataSource= new MatTableDataSource<GoiTho>(this.goitho)
  console.log(this.goitho)
  this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
}

}
