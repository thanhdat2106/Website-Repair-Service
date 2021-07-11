import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DichVu } from 'src/app/Models/DichVu';
import { LoaiDV } from 'src/app/Models/LoaiDV';
import { DichvuServicesService } from 'src/app/Services/DichVu/dichvu-services.service';
import { LoaidvServicesService } from 'src/app/Services/LoaiDV/loaidv-services.service';

@Component({
  selector: 'app-navbar-layout',
  templateUrl: './navbar-layout.component.html',
  styleUrls: ['./navbar-layout.component.css']
})
export class NavbarLayoutComponent implements OnInit {
  List: LoaiDV[]
  Listdv: DichVu[]
  constructor(private loaidv: LoaidvServicesService,
    private dv: DichvuServicesService,
    private router: Router,
      ) { }

  ngOnInit(){
    this.getAll_LoaiDV();
    this.getAll_DichVu();
  }
  getAll_LoaiDV()
  {
    this.loaidv.getAll().subscribe(res=>{
      this.List=res

    })
  }
  getAll_DichVu()
  {
    this.dv.getAll().subscribe(res=>{
      this.Listdv=res
    })
  }
  reload(id: number)
{
  //this.router.navigated= false;
  this.router.navigate(['web/tintuc/',id])
  .then(() => {
    window.location.reload();
  });
}

}
