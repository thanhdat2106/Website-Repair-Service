import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaiDV } from 'src/app/Models/LoaiDV';
import { LoaidvServicesService } from 'src/app/Services/LoaiDV/loaidv-services.service';

@Component({
  selector: 'app-footer-layout',
  templateUrl: './footer-layout.component.html',
  styleUrls: ['./footer-layout.component.css']
})
export class FooterLayoutComponent implements OnInit {

  list: LoaiDV[];
  constructor(private loaidv: LoaidvServicesService,private router: Router,) { }

  ngOnInit() {
    this.loaidv.getAll().subscribe(res=>{this.list= res});
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
