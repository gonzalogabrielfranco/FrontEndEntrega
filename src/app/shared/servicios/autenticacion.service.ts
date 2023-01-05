import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {usuarioModel} from "../modelo/usuario.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  usuarioAutenticado:usuarioModel|null;
  url="https://portfoliobackend-gonzalogabrielfranco.koyeb.app";
  constructor(private http:HttpClient) { }
  autenticar(usuario:string,contrasenia:string):Observable<usuarioModel>{
    return this.http.post<usuarioModel>(this.url+"/api/usuario/login",{nombre:usuario,contrasenia:contrasenia});
}
  getUsuarioAutenticado():usuarioModel{
    return (sessionStorage.getItem("Currentusuario") as unknown) as usuarioModel;
  }
  cerrarSesion(){
    sessionStorage.removeItem("Currentusuario");
    this.usuarioAutenticado=null;
  }
}
