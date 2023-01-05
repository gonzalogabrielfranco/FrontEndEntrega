import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() {
  }

  calculodefechaedad(fechaNacimiento: string): number {
    let fechaActual = new Date();
    let fechaNac = new Date(fechaNacimiento);
    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();
    let mes = fechaActual.getMonth() - fechaNac.getMonth();
    let dia = fechaActual.getDay() - fechaNac.getDay();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }

  calculoExperiencia(fechaInicio: string, fechaFin: string): string {
    let fechaF;
    if (fechaFin == ""|| fechaFin==null || fechaFin=="Actualidad") {
      fechaF = new Date();
    } else {
      fechaF = new Date(fechaFin);
    }
    let fechaI = new Date(fechaInicio);
    let edad: number = fechaF.getFullYear() - fechaI.getFullYear();
    let mes: number = fechaF.getMonth() - fechaI.getMonth();
    let dia: number = fechaF.getDay() - fechaI.getDay();
    if (mes == 0) {
      if (dia < 0) {
        edad--;
        mes = 11;
      } else if (dia == 0) {
        mes = 0;
      } else if (dia > 0) {
        mes = 0;
      }
    } else if (mes > 0) {
      if (dia < 0) {
        mes = mes;
      } else if (dia == 0) {
        mes = mes;
      } else if (dia > 0) {
        mes = mes - 1;
      }
    } else if (mes < 0) {
      if (dia < 0) {
        edad--;
        mes = 12 + mes - 1;
      } else if (dia == 0) {
        edad--;
        mes = 12 + mes;
      } else if (dia > 0) {
        edad--;
        mes = 12 + mes;
      }
    }

    if (edad == 0) {
      return mes + " meses";
    } else if (mes == 0) {
      return edad + " años";
    } else {
      return edad + " años y " + mes + " meses";
    }
  }

  devolverNombreString(fecha: string){
    let fechaN = fecha.split("-");
    let f="";
    switch (+fechaN[1]) {
      case 1:{
        f= fechaN[2]+" de Enero del "+fechaN[0];
        break;}
      case 2:{
        f= fechaN[2]+" de Febrero del "+fechaN[0];
        break;}
      case 3:{
        f= fechaN[2]+" de Marzo del "+fechaN[0];
        break;}
      case 4:{
        f= fechaN[2]+" de Abril del "+fechaN[0];
        break;}
      case 5:{
        f= fechaN[2]+" de Mayo del "+fechaN[0];
        break;}
      case 6:{
        f= fechaN[2]+" de Junio del "+fechaN[0];
        break;}
      case 7:{
        f=  fechaN[2]+" de Julio del "+fechaN[0];
        break;}
      case 8:{
        f= fechaN[2]+" de Agosto del "+fechaN[0];
        break;}
      case 9:{
        f= fechaN[2]+" de Septiembre del "+fechaN[0];
        break;}
      case 10:{
        f= fechaN[2]+" de Octubre del "+fechaN[0];
        break;}
      case 11:{
        f= fechaN[2]+" de Noviembre del "+fechaN[0];
        break;}
      case 12:{
        f= fechaN[2]+" de Diciembre del "+fechaN[0];
        break;}
    }
    return f;
    }

}
