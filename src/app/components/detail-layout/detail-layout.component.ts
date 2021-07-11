import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TinTuc } from 'src/app/Models/TinTuc';
import { TintucServicesService } from 'src/app/Services/TinTuc/tintuc-services.service';

@Component({
  selector: 'app-detail-layout',
  templateUrl: './detail-layout.component.html',
  styleUrls: ['./detail-layout.component.css']
})
export class DetailLayoutComponent implements OnInit {
  matintuc: number
  tintuc: TinTuc
  constructor(
    private route: ActivatedRoute,
    private tintucdv: TintucServicesService
  ) { }

  ngOnInit(){
    this.matintuc = this.route.snapshot.params['maTT'];
    this.getByID();

  }
  getByID()
  {
    this.tintucdv.getByID(this.matintuc).subscribe(res=> {this.tintuc= res});
  }

}
