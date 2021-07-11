import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BangGiaThamKhao } from 'src/app/Models/BangGiaThamKhao';

@Injectable({
  providedIn: 'root'
})
export class BanggiaService {

  private apiUrl = 'http://localhost:56179/api/BangGiaThamKhao';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<BangGiaThamKhao[]>{
    return this.httpClient.get<BangGiaThamKhao[]>(this.apiUrl);
  }
  getAllByID(id: number):Observable<BangGiaThamKhao[]>{
    return this.httpClient.get<BangGiaThamKhao[]>("http://localhost:56179/api/BangGiaThamKhao/GetAllByID/"+id);
  }
  getByID(id: number):Observable<BangGiaThamKhao>{
    return this.httpClient.get<BangGiaThamKhao>(this.apiUrl+'/'+id);
  }
  Post(banggia : BangGiaThamKhao) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.httpClient.post<BangGiaThamKhao>("http://localhost:56179/api/BangGiaThamKhao/",banggia,httpOptions)
  } 
  Put(banggia: BangGiaThamKhao): Observable<BangGiaThamKhao>
  {
    return this.httpClient.put<BangGiaThamKhao>("http://localhost:56179/api/BangGiaThamKhao/"+banggia.maGiaThamKhao,banggia);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete("http://localhost:56179/api/BangGiaThamKhao/"+id);
  }
}
