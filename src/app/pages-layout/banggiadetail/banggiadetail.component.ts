import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BangGiaThamKhao } from 'src/app/Models/BangGiaThamKhao';
import { DichVu } from 'src/app/Models/DichVu';
import { BanggiaService } from 'src/app/Services/BangGia/banggia.service';
import { DichvuServicesService } from 'src/app/Services/DichVu/dichvu-services.service';
@Component({
  selector: 'app-banggiadetail',
  templateUrl: './banggiadetail.component.html',
  styleUrls: ['./banggiadetail.component.css']
})
export class BanggiadetailComponent implements OnInit {

  listbanggia: BangGiaThamKhao[]
  dv: DichVu;
  madv: number
  filterargs = 1;
  constructor(
    private route: ActivatedRoute,
    private bangia: BanggiaService,
    private dichvu: DichvuServicesService
  ) { }

  ngOnInit() {
    this.madv = this.route.snapshot.params['maDV'];
  
  this.getDichVu();
  this.getAllByID();
  console.log(this.route.snapshot.params['maDV']);
 
  }
  
getDichVu()
{
  this.dichvu.getByID(this.madv).subscribe(res=>{this.dv= res})
}
getAllByID()
{
  this.bangia.getAllByID(this.madv).subscribe(res=>{this.listbanggia= res});
}

}
