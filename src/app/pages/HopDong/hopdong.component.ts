import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HopDong } from 'src/app/Models/HopDong';
import { HopdongService } from 'src/app/Services/HopDong/hopdong.service';

@Component({
  selector: 'app-hopdong',
  templateUrl: './hopdong.component.html',
  styleUrls: ['./hopdong.component.css']
})
export class HopdongComponent implements OnInit {
  manv : Number;
  hopdongIdUpdate = null; 
  addForm: FormGroup
  displayedColumns: string[] = ['maTho','maNV','ngayKiKet','ngayBD','ngayKT','maHopDong'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private hdservice:HopdongService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
   ) { }


  ngOnInit(){
    this.manv = this.route.snapshot.params['manv'];
    this.addForm = this.formBuilder.group({
      //employeeID: [],
      //maHopDong: ['', Validators.required],
      maTho: ['', Validators.required],
      maNV: [this.manv, Validators.required],
      ngayKiKet: ['', Validators.required],
      ngayBD: ['', Validators.required],
      ngayKT: ['', Validators.required],
      
     
    });
    this.loadHopDong();
    console.log(this.manv)
    
  }
  dataSource = new MatTableDataSource();
  loadHopDong(){
    this.hdservice.getAll().subscribe(res=>{
      this.dataSource= new MatTableDataSource<HopDong>(res)
      this.dataSource.sort = this.sort;
      console.log(res)
      // phan trang
      this.dataSource.paginator = this.paginator;
      });
      this.hopdongIdUpdate= null;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onSubmit(){
    const HopDong = this.addForm.value;
    console.log(HopDong)
    this.createHD(HopDong);
    //this.addForm.reset();
  }
  createHD(HopDong: HopDong)
  {

    HopDong.maTho = Number(HopDong.maTho)
    HopDong.maNV = Number(this.manv.toString())
    
    if(HopDong.ngayKiKet>HopDong.ngayBD)
    {
      this._snackBar.open("Ngày ký kết phải nhỏ hơn ngày bắt đầu", "OK", {
        duration: 2000,
      });
    }
    else if(HopDong.ngayBD>HopDong.ngayKT)
    {
      this._snackBar.open("Ngày ký bắt đầu hợp đồng phải nhỏ hơn ngày kết thúc", "OK", {
        duration: 2000,
      });
    }
    else if (this.hopdongIdUpdate == null) {  
    HopDong.ngayKiKet.setDate(HopDong.ngayKiKet.getDate()+1)
    HopDong.ngayBD.setDate(HopDong.ngayBD.getDate()+1)
    HopDong.ngayKT.setDate(HopDong.ngayKT.getDate()+1)
      this.hdservice.Post(HopDong).subscribe(  
        () => {    
          this.loadHopDong();  
          this.hopdongIdUpdate = null;  
          this.addForm.reset();  
          this._snackBar.open("Bạn đã thêm thành công", "OK", {
            duration: 2000,
          });
        }  
      );  
    } else {  
      HopDong.maHopDong = this.hopdongIdUpdate;  
      if(HopDong.ngayKiKet.getDate)
      {
        HopDong.ngayKiKet.setDate(HopDong.ngayKiKet.getDate()+1)
      }
     else if(HopDong.ngayBD.getDate)
     {
      HopDong.ngayBD.setDate(HopDong.ngayBD.getDate()+1)
     }
      else if(HopDong.ngayKT.getDate)
     {
      HopDong.ngayKT.setDate(HopDong.ngayKT.getDate()+1)
     }
      this.hdservice.Put(HopDong).subscribe(() => {  
        this.loadHopDong();  
        this.hopdongIdUpdate = null;  
        this.addForm.reset();  
        this._snackBar.open("Bạn đã chỉnh sửa thành công", "OK", {
          duration: 2000,
        });
      });  
    }  
  }
  loadhopdongToEdit(ma: number){
    this.hdservice.getByID(ma).subscribe(res=> {  
      
      this.hopdongIdUpdate = res.maHopDong;  
      this.addForm.get("maTho").setValue(res.maTho);
      this.addForm.get("maNV").setValue(res.maNV);
      this.addForm.get("ngayKiKet").setValue(res.ngayKiKet);
      this.addForm.get("ngayBD").setValue(res.ngayBD);
      this.addForm.get("ngayKT").setValue(res.ngayKT);
      //console.log(ma)
    });
  }
  deleteEmployee(ma: number)
  {
    if (confirm("Are you sure you want to delete this ?")) { 
      this.calldelete(ma);
      this.loadHopDong();
      }
  }
  calldelete(id: number)
  {
    this.hdservice.Delete(id).subscribe(()=>
    {
      this.loadHopDong(); 
      this._snackBar.open("Bạn đã xóa thành công", "OK", {
        duration: 2000,
      });
    });
    this.addForm.reset();
    
  }
  reset()
  {
    this.hopdongIdUpdate= null
    this.addForm.reset();
    this.addForm.get("maNV").setValue(this.manv);
  }
}
