import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaiDV } from 'src/app/Models/LoaiDV';
import { LoaidvServicesService } from 'src/app/Services/LoaiDV/loaidv-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'app-services-tpye-list',
  templateUrl: './services-tpye-list.component.html',
  styleUrls: ['./services-tpye-list.component.css']
})
export class LoaiDVListComponent implements OnInit {
  List: LoaiDV[];
  ldv: LoaiDV;
  tendv: string;
  addForm: FormGroup
  loaidvIdUpdate = null; 
  displayedColumns: string[] = ['tenLoaiDV','maLoaiDV'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private loaidv: LoaidvServicesService,private formBuilder: FormBuilder,) { }
 
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      //employeeID: [],
      tenLoaiDV: ['', Validators.required],
     
    });
    this.loadServicesType();
    this.getByID();
    console.log(this.ldv);
  }
  dataSource = new MatTableDataSource();
  loadServicesType(){
    this.loaidv.getAll().subscribe(res=>{
      this.dataSource= new MatTableDataSource<LoaiDV>(res)
      this.dataSource.sort = this.sort;
      console.log(res)
      // phan trang
      this.dataSource.paginator = this.paginator;
      });
      this.loaidvIdUpdate = null; 
  } 
  getByID()
  {
    this.loaidv.getByID(1).subscribe(res=>{this.ldv=res})
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSubmit(){
    const LoaiDV = this.addForm.value;
    console.log(LoaiDV)
    this.createEmployee(LoaiDV);
    this.addForm.reset();
  }
  createEmployee(LoaiDV: LoaiDV)
  {
    if (this.loaidvIdUpdate == null) {  
      this.loaidv.Post(LoaiDV).subscribe(  
        () => {    
          this.loadServicesType();  
          this.loaidvIdUpdate = null;  
          this.addForm.reset();  
        }  
      );  
    } else {  
      LoaiDV.maLoaiDV = this.loaidvIdUpdate;  
      this.loaidv.Put(LoaiDV).subscribe(() => {  
        this.loadServicesType();  
        this.loaidvIdUpdate = null;  
        this.addForm.reset();  
      });  
    }  
  }
  loadloaidvToEdit(ma: number){
    this.loaidv.getByID(ma).subscribe(res=> {  
      this.ldv = res;
      this.tendv= res.tenLoaiDV
      this.loaidvIdUpdate = this.ldv.maLoaiDV;  
      this.addForm.get("tenLoaiDV").setValue(this.ldv.tenLoaiDV);
      console.log(ma)
    });
    console.log(this.loaidvIdUpdate)
  }
  deleteEmployee(ma: number)
  {
    if (confirm("Are you sure you want to delete this ?")) { 
      this.calldelete(ma);
      this.loadServicesType();
      }
  }
  calldelete(id: number)
  {
    this.loaidv.Delete(id).subscribe(()=>
    {
      this.loadServicesType(); 
    });
    this.addForm.reset();
    
  }
  reset()
  {
    this.loaidvIdUpdate= null
    this.addForm.reset();
  }

}
