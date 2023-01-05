import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { redesSocialesModel} from "../modelo/redessociales.model";

@Injectable({
  providedIn: 'root'
})
export class RedessocialesService {
  constructor(private http:HttpClient) { }
  url="https://portfoliobackend-gonzalogabrielfranco.koyeb.app";
  getRedesSociales():Observable<redesSocialesModel[]>{
    return this.http.get<redesSocialesModel[]>(this.url+'/api/redessociales/traer');
  }
  guardarRedesSociales(redes: any):Observable<redesSocialesModel>{
    return this.http.post<redesSocialesModel>(this.url+'/api/redessociales/guardar',redes);
  }
  actualizarRedesSociales(redes: any):Observable<redesSocialesModel>{
    return this.http.put<redesSocialesModel>(this.url+'/api/redessociales/actualizar',redes);
  }
  eliminarredsociales(id:number):Observable<redesSocialesModel>{
    return this.http.delete<redesSocialesModel>(this.url+'/api/redessociales/borrar?id='+id);
  }
}
