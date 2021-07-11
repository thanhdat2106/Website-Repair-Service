import { DatePipe } from '@angular/common';
import { ParsedEvent } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { HoaDon } from 'src/app/Models/HoaDon';
import { KhachHang } from 'src/app/Models/KhachHang';
import { SalesChart } from 'src/app/Models/SalesChart';
import { ThoSua } from 'src/app/Models/ThoSua';
import { HoadonService } from 'src/app/Services/HoaDon/hoadon.service';
import { KhachhangServicesService } from 'src/app/Services/KhachHang/khachhang-services.service';
import { ThosuaServicesService } from 'src/app/Services/ThoSua/thosua-services.service';
import * as CanvasJS from 'src/assets/canvasjs.min';
// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2
// } from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  ////
  KhachHang:KhachHang[]
  totalKH: Number;
  ThoSua:Array<ThoSua>=[]
  totalTS: Number;
  HoaDon: Array<HoaDon>=[]
  totalLN: Number=0;
  totalLN1: Number=0;
  date =  new Date();
  datasales: Array<SalesChart>=[];
  data: Array<{y: Float32List, label: string}>=[]
  constructor(private khservice: KhachhangServicesService,
    private tsservice: ThosuaServicesService,
    private hdservice: HoadonService,
    public datepipe: DatePipe,
    ) { }

  ngOnInit() {
    
////
    
    this.loadKhachHang();
    this.loadThoSua();
    this.loadHoaDon();
    this.loadChart();
    console.log(this.HoaDon)
    console.log(this.data)
   
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  loadKhachHang()
  {
    this.khservice.getAll().subscribe(res=>{
      this.KhachHang = res
      this.totalKH= res.length
    } ) 
    
  }
  loadThoSua()
  {
    this.tsservice.getAll().subscribe(res=>{
      this.totalTS = res.length;
      //this.ThoSua[0] = res[0]
     for(var i=1; i<7;i++)
     {
       this.ThoSua.push(res[i])
     }
    
      });
  }
  loadHoaDon()
  {
    this.hdservice.getAll().subscribe(res=>{
      for(var i= res.length-6; i<res.length;i++)
      {
        this.HoaDon.push(res[i])
      }
      console.log(this.HoaDon)
      for(var i=0; i< res.length;i++)
    {
      //console.log(res[i].ngayLap.getMonth)
      if(this.datepipe.transform(res[i].ngayLap, 'MM/yyyy')==this.datepipe.transform(this.date, 'MM/yyyy'))
      {
        this.totalLN=parseInt(this.totalLN.toString())+  parseInt(res[i].phiDichVu.toString())
      }
      if(this.datepipe.transform(res[i].ngayLap, 'yyyy')==this.datepipe.transform(this.date, 'yyyy'))
      {
        this.totalLN1=parseInt(this.totalLN1.toString())+  parseInt(res[i].phiDichVu.toString())
      }
      this.totalLN1=parseInt(this.totalLN1.toString())+  parseInt(res[i].phiDichVu.toString())
    }
       });
  }
  loadChart()
  {
    this.hdservice.getchart().subscribe(res=>{
      
      for(var i=0; i< res.length;i++)
      {
        this.datasales.push(res[i])
      }
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "BIEU DO DOANH THU THEO THANG"
        },
        data: [{
          type: "column",
          dataPoints:
          [
            { y: this.datasales[0].tongTien, label: this.datasales[0].ngay },
            { y: this.datasales[1].tongTien, label:  this.datasales[1].ngay },
            { y: this.datasales[2].tongTien, label:  this.datasales[2].ngay },
            { y: this.datasales[3].tongTien, label:  this.datasales[3].ngay },
            { y: this.datasales[4].tongTien, label:  this.datasales[4].ngay },
            { y: this.datasales[5].tongTien, label:  this.datasales[5].ngay },
            { y: this.datasales[6].tongTien, label:  this.datasales[6].ngay },
            { y: this.datasales[7].tongTien, label:  this.datasales[7].ngay },
            { y: this.datasales[8].tongTien, label:  this.datasales[8].ngay },
            { y: this.datasales[9].tongTien, label:  this.datasales[9].ngay },
            { y: this.datasales[10].tongTien, label:  this.datasales[10].ngay },
             { y: this.datasales[11].tongTien, label:  this.datasales[11].ngay }
          ]
        }]
      });
      
      chart.render();
    })
  }
  
}
