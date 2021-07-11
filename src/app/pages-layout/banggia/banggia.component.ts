import { Component, OnInit } from '@angular/core';
import { BangGiaThamKhao } from 'src/app/Models/BangGiaThamKhao';
import { DichVu } from 'src/app/Models/DichVu';
import { DichvuComponent } from 'src/app/pages/DichVu/dichvu.component';
import { BanggiaService } from 'src/app/Services/BangGia/banggia.service';
import { DichvuServicesService } from 'src/app/Services/DichVu/dichvu-services.service';

@Component({
  selector: 'app-banggia',
  templateUrl: './banggia.component.html',
  styleUrls: ['./banggia.component.css']
})
export class BanggiaComponent implements OnInit {

  dichvu: DichVu[]
  banggia: BangGiaThamKhao[]
  listdichvu: number[]
  constructor(private dv: DichvuServicesService,
    private bg: BanggiaService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.dv.get().subscribe(res => { this.dichvu = res;});

    this.bg.getAll().subscribe(res => { this.banggia = res });
   
    console.log(this.listdichvu)
  }
  getdichvu() {
  
      

  }

}
