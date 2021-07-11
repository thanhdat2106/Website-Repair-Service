import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KhachHang } from 'src/app/Models/KhachHang';

@Injectable({
  providedIn: 'root'
})
export class KhachhangServicesService {

  private apiUrl = 'http://localhost:56179/api/KhachHang';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<KhachHang[]>{
    return this.httpClient.get<KhachHang[]>(this.apiUrl);
  }
  getByID(id: number):Observable<KhachHang>{
    return this.httpClient.get<KhachHang>(this.apiUrl+'/'+id);
  }
  Post(khachhang : KhachHang) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    console.log(khachhang);
    return this.httpClient.post<KhachHang>("http://localhost:56179/api/KhachHang/",khachhang,httpOptions)
  } 
  Put(khachhang: KhachHang): Observable<KhachHang>
  {
    return this.httpClient.put<KhachHang>("http://localhost:56179/api/KhachHang/"+khachhang.maKH,khachhang);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete("http://localhost:56179/api/KhachHang/"+id);
  }
}
