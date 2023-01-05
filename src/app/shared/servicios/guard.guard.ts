import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AutenticacionService} from "./autenticacion.service";
import {usuarioModel} from "../modelo/usuario.model";
import  {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  usuario:usuarioModel;
  constructor(private autenticacionservicio:AutenticacionService,private ruta:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.usuario = this.autenticacionservicio.getUsuarioAutenticado();
    if (this.usuario != null ) {
      return true;
    } else {
      this.ruta.navigate(['/']);
      return false;
    }
  }
}
