import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { TinTuc } from 'src/app/Models/TinTuc';
import { TintucServicesService } from 'src/app/Services/TinTuc/tintuc-services.service';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent implements OnInit {

  tt: TinTuc[];
  maldv: number;
  constructor(private tintuc: TintucServicesService,
    private route: ActivatedRoute,
) {
  this.maldv = this.route.snapshot.params['id'];
  console.log(this.maldv)
 }

  ngOnInit(){

    
    this.GetAllByID();
    console.log(this.tt)
    console.log(this.maldv)
    
    
  }
GetAllByID(){
  this.tintuc.getAllByID(this.maldv).subscribe(res=>{this.tt= res})
}
}
