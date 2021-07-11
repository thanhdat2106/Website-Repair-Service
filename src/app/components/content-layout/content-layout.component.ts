import { Component, OnInit } from '@angular/core';
import { TinTuc } from 'src/app/Models/TinTuc';
import { TintucServicesService } from 'src/app/Services/TinTuc/tintuc-services.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent implements OnInit {
  allTinTuc: TinTuc[];
  constructor(private tintucdv: TintucServicesService) { }

  ngOnInit() {
  this.Get();
 
  }
  Get()
  {
    this.tintucdv.getAll().subscribe(res=>{this.allTinTuc= res
      //console.log(this.allTinTuc)
    })
    
  }
  

}
