import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DichVu } from 'src/app/Models/DichVu';
import { DichvuServicesService } from 'src/app/Services/DichVu/dichvu-services.service';

@Component({
  selector: 'app-dichvu',
  templateUrl: './dichvu.component.html',
  styleUrls: ['./dichvu.component.css']
})
export class DichvuComponent implements OnInit {

  addForm: FormGroup
  dvIdUpdate = null
  
  displayedColumns: string[] = ['tenDV','maLoaiDV','maDV'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private dvservices: DichvuServicesService,private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      //employeeID: [],
      tenDV: ['', Validators.required],
      maLoaiDV: ['', Validators.required],
      
    });
    this.loadDichVu();
  }
  
  dataSource = new MatTableDataSource();
  loadDichVu(){
    this.dvservices.getAll().subscribe(res=>{
      this.dataSource= new MatTableDataSource<DichVu>(res)
      this.dataSource.sort = this.sort;
      console.log(res)
      // phan trang
      this.dataSource.paginator = this.paginator;
      });
      this.dvIdUpdate = null; 
  } 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSubmit(){
    const dichvu = this.addForm.value;
    console.log(dichvu)
    this.createDichvu(dichvu);
    this.addForm.reset();
  }
  createDichvu(dichvu: DichVu){
    if (this.dvIdUpdate == null) {  
      dichvu.maLoaiDV= Number(dichvu.maLoaiDV)
      this.dvservices.Post(dichvu).subscribe(  
        () => {    
          this.loadDichVu();  
          this.dvIdUpdate = null;  
          this.addForm.reset();  
        }  
      );  
    } else {  
      dichvu.maDV = this.dvIdUpdate;  
      this.dvservices.Put(dichvu).subscribe(() => {  
        this.loadDichVu();  
        this.dvIdUpdate = null;  
        this.addForm.reset();  
      });  
    }  
  }
  loaddvToEdit(ma: number){
    this.dvservices.getByID(ma).subscribe(res=> {  
      this.dvIdUpdate = res.maDV;  
      this.addForm.get("tenDV").setValue(res.tenDV);
      this.addForm.get("maLoaiDV").setValue(res.maLoaiDV);
      console.log(ma)
    });
  }
  deleteEmployee(ma: number)
  {
    if (confirm("Are you sure you want to delete this ?")) { 
      this.calldelete(ma);
      this.loadDichVu();
      }
  }
  calldelete(id: number)
  {
    this.dvservices.Delete(id).subscribe(()=>
    {
      this.loadDichVu(); 
    });
    this.addForm.reset();
    
  }
  reset()
  {
    this.dvIdUpdate= null
    this.addForm.reset();
  }

}
