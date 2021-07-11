import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ChucVu } from 'src/app/Models/ChucVu';
import { NhanVien } from 'src/app/Models/NhanVien';

@Injectable({
  providedIn: 'root'
})
export class NhanvienServicesService {
  private apiUrl = 'http://localhost:56179/api/NhanVien';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<NhanVien[]>{
    return this.httpClient.get<NhanVien[]>(this.apiUrl);
  }
  getByID(id: number):Observable<NhanVien>{
    return this.httpClient.get<NhanVien>(this.apiUrl+'/'+id);
  }
  Post(nv : NhanVien) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.httpClient.post<NhanVien>("http://localhost:56179/api/NhanVien/",nv,httpOptions)
  } 
  Put(nv: NhanVien): Observable<NhanVien>
  {
    return this.httpClient.put<NhanVien>("http://localhost:56179/api/NhanVien/"+nv.maNV,nv);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete("http://localhost:56179/api/NhanVien/"+id);
  }
  getChucVu():Observable<ChucVu[]>
  {
    return this.httpClient.get<ChucVu[]>("http://localhost:56179/api/ChucVu");
  }
}
