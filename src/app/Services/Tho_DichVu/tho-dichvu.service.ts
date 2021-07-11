import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tho_DichVu } from 'src/app/Models/Tho_DichVu';

@Injectable({
  providedIn: 'root'
})
export class ThoDichvuService {

  private apiUrl = 'http://localhost:56179/api/Tho_DichVu/GetAllByID';
  constructor(private httpClient:HttpClient, private route: ActivatedRoute ) { }

  getByID(id: number):Observable<Tho_DichVu[]>{
    return this.httpClient.get<Tho_DichVu[]>(this.apiUrl+'/'+id);
  }
  delete(id: number){
    return this.httpClient.delete("http://localhost:56179/api/Tho_DichVu/"+id);
  }
 
}
