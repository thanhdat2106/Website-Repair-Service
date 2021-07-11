import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaiDV } from 'src/app/Models/LoaiDV';
import { LoaidvServicesService } from 'src/app/Services/LoaiDV/loaidv-services.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit {
  List: LoaiDV[]
  constructor(private loaidv: LoaidvServicesService,
    private router: Router,
    ) { }

  ngOnInit(){
    this.getAll_LoaiDV();
  }
  getAll_LoaiDV()
  {
    this.loaidv.getAll().subscribe(res=>{
      this.List=res
      console.log(this.List)
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
