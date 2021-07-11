import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GoiTho } from 'src/app/Models/GoiTho';
import { GoiTho_TT } from 'src/app/Models/GoiTho_TT';
import { ThoSua } from 'src/app/Models/ThoSua';
import { UpdateGoiTho } from 'src/app/Models/UpdateGoiTho';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GoithoService {

  constructor(private httpClient:HttpClient, private route: ActivatedRoute) { }
  getAll():Observable<GoiTho[]>{
    return this.httpClient.get<GoiTho[]>(environment.apiUrl+'GoiTho');
  }
  getByID(id: number):Observable<GoiTho>{
    return this.httpClient.get<GoiTho>(environment.apiUrl+'GoiTho/'+id);
  }
  GetByGT(id: number):Observable<ThoSua[]>{
    return this.httpClient.get<ThoSua[]>(environment.apiUrl+'GoiTho/GetByGT/'+id);
  }
  getTT(id: number):Observable<GoiTho_TT[]>{
    return this.httpClient.get<GoiTho_TT[]>(environment.apiUrl+'GoiTho/getTT/'+id);
  }
  Post(goitho : GoiTho) { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    //console.log(goitho);
    return this.httpClient.post<GoiTho>(environment.apiUrl+'GoiTho/',goitho,httpOptions)
  } 
  Put(goitho: UpdateGoiTho): Observable<UpdateGoiTho>
  {
    return this.httpClient.put<UpdateGoiTho>(environment.apiUrl+'GoiTho/',goitho);
  } 
  Delete(id: number)
  {
    return this.httpClient.delete(environment.apiUrl+'GoiTho/'+id);
  }
}
