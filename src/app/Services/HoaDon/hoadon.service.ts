import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChiTietHoaDon } from 'src/app/Models/ChiTietHoaDon';
import { CTHD } from 'src/app/Models/CTHD';
import { DanhGia } from 'src/app/Models/DanhGia';
import { HoaDon } from 'src/app/Models/HoaDon';
import { SalesChart } from 'src/app/Models/SalesChart';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HoadonService {
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<HoaDon[]>{
    return this.httpClient.get<HoaDon[]>(environment.apiUrl+'HoaDon');
  }
  getchart():Observable<SalesChart[]>{
    return this.httpClient.get<SalesChart[]>(environment.apiUrl+'HoaDon/chart');
  }
  getByID(id: number):Observable<HoaDon>{
    return this.httpClient.get<HoaDon>(environment.apiUrl+'HoaDon/'+id);
  }
  getCTHDByID(id: number):Observable<CTHD[]>{
    return this.httpClient.get<CTHD[]>(environment.apiUrl+'ChiTietHoaDon/GetCTHD/'+id);
  }
  getDanhGia(id: number):Observable<DanhGia>
  {
    return this.httpClient.get<DanhGia>(environment.apiUrl+'DanhGia/'+id);
  }
  Post(hoadon : HoaDon) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    console.log(hoadon);
    return this.httpClient.post<HoaDon>(environment.apiUrl+'HoaDon/',hoadon,httpOptions)
  } 
  Put(hoadon: HoaDon): Observable<HoaDon>
  {
    return this.httpClient.put<HoaDon>(environment.apiUrl+'HoaDon/'+hoadon.maHD,hoadon);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete(environment.apiUrl+'HoaDon/'+id);
  }
  PostCTHD(cthd : ChiTietHoaDon) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    console.log(cthd);
    return this.httpClient.post<ChiTietHoaDon>(environment.apiUrl+'ChiTietHoaDon/',cthd,httpOptions)
  } 
}
