import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ThoSua } from 'src/app/Models/ThoSua';
import { ThosuaServicesService } from 'src/app/Services/ThoSua/thosua-services.service';
import { ThoDichvuService } from 'src/app/Services/Tho_DichVu/tho-dichvu.service';
import { DialogThoSua } from './DialogThoSua.component';
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: 'app-thosua',
  templateUrl: './thosua.component.html',
  styleUrls: ['./thosua.component.css']
})
export class ThosuaComponent implements OnInit {

  ts: ThoSua
  displayedColumns: string[] = ['tenTho','soNha','sdt','email','diemDanhGia','soDu','maTho'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private thosuadv:ThosuaServicesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private tdv: ThoDichvuService,
    private _snackBar: MatSnackBar,) { }


  ngOnInit() {
    this.loadThoSua();
  }
  dataSource = new MatTableDataSource();
  loadThoSua()
  {
    this.thosuadv.getAll().subscribe(res=>{
      this.dataSource= new MatTableDataSource<ThoSua>(res)
      this.dataSource.sort = this.sort;
      console.log(res)
      // phan trang
      this.dataSource.paginator = this.paginator;
      });
     
  }
  deleteEmployee(id: number)
  {
    if (confirm("Are you sure you want to delete this ?")) { 
      console.log(id)
      //this.tdv.delete(id).subscribe(()=>{})
      this.calldelete(id)
      this.loadThoSua();
      }
   
  }
  calldelete(id: number)
  {
    try{
    this.thosuadv.Delete(id).subscribe(()=>{
      this.loadThoSua();
    },(error)=>{
      this._snackBar.open("Tài khoản đang được sử dụng tại mục khác.", "OK", {
        duration: 2000,
      });
    }
    )
    
  }catch{
    this._snackBar.open("Bạn đã thêm thành công", "OK", {
      duration: 2000,
    });
  }
    
  }
  openDialog(id: number) {
    this.thosuadv.getByID(id).subscribe(res=> {this.ts= res
      const dialogRef = this.dialog.open(DialogThoSua, {
        width: '80%',
        data:  this.ts,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ts = result;
      this.loadThoSua();
    });
    });
    console.log(this.ts)
  
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}

///DailogThoSua
// @Component({
//   selector: 'DialogThoSua',
//   templateUrl: 'DialogThoSua.component.html',
//   providers: [{
//     provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
//   }]
// })
// export class DialogThoSua implements OnInit {
//   firstFormGroup: FormGroup;
//   secondFormGroup: FormGroup;
//   constructor(
//     public dialogRef: MatDialogRef<DialogThoSua>,
//     @Inject(MAT_DIALOG_DATA) public data: ThoSua,
//     private _formBuilder: FormBuilder,
//     ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//   ngOnInit() {
//     this.firstFormGroup = this._formBuilder.group({
//       firstCtrl: ['', Validators.required]
//     });
//     this.secondFormGroup = this._formBuilder.group({
//       secondCtrl: ['', Validators.required]
//     });
//   }

// }
