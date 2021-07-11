import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NhanvienServicesService } from 'src/app/Services/NhanVien/nhanvien-services.service';
import { NhanVien } from 'src/app/Models/NhanVien';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() manv: number;
  public focus;
  public listTitles: any[];
  public location: Location;
  nhanvien: NhanVien;
  TenNV: string;
  allnhanvien: NhanVien[]=[];
  constructor(location: Location,  private element: ElementRef, private router: Router, private nvServices: NhanvienServicesService) {
    this.location = location;
  }

  ngOnInit() { 
    this.getByID();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    
  }
  getByID()
  {
    this.nvServices.getByID(this.manv).subscribe(res=>{
      this.nhanvien = res,
      this.TenNV = res.tenNV
    }
      )
    
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  viewWeb(){
    //this.router.navigateByUrl('../../web');
    //console.log( this.router.navigateByUrl('/web/banggia'))
    //this.router.navigate([''])
    this.router.navigate(['web'])

  }
}
