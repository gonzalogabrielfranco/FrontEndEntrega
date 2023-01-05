import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HardandsoftskillModel} from "../modelo/hardandsoftskill.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HardsoftskillService {
  hardsoftskilllista:HardandsoftskillModel[]=[];
  constructor(private http:HttpClient) { }
  url="https://portfoliobackend-gonzalogabrielfranco.koyeb.app";
  getHardsoftskill():Observable<HardandsoftskillModel[]>{
    return this.http.get<HardandsoftskillModel[]>(this.url+'/api/hardandsoft/traer');
  }
  gurdarHardAndSoftSkill(skill:any):Observable<HardandsoftskillModel>{
    return this.http.post<HardandsoftskillModel>(this.url+'/api/hardandsoft/guardar',skill);
  }
  actualizarHardAndSoftSkill(skill:any):Observable<HardandsoftskillModel>{
    return this.http.put<HardandsoftskillModel>(this.url+'/api/hardandsoft/actualizar',skill);
  }
  eliminarHardAndSoftSkill(id:any):Observable<HardandsoftskillModel>{
    return this.http.delete<HardandsoftskillModel>(this.url+'/api/hardandsoft/borrar?id='+id);
  }
}
