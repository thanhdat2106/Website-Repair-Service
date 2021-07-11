import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TinTuc } from 'src/app/Models/TinTuc';
import { TintucServicesService } from 'src/app/Services/TinTuc/tintuc-services.service';

@Component({
  selector: 'app-slidebar-layout',
  templateUrl: './slidebar-layout.component.html',
  styleUrls: ['./slidebar-layout.component.css']
})
export class SlidebarLayoutComponent implements OnInit {

  list : TinTuc[]
  constructor( private tt: TintucServicesService,
    private router: Router,) { }

  ngOnInit() {
    this.getSix();
  }
  getSix()
  {
    this.tt.getSix().subscribe(res=>{this.list= res})
  }
  reload(id: number)
  {
    //this.router.navigated= false;
    this.router.navigate(['web/detail/',id])
    .then(() => {
      window.location.reload();
    });
  }
}
