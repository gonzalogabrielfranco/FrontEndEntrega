import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AutenticacionService} from "../../shared/servicios/autenticacion.service";

@Component({
  selector: 'app-portfoliover',
  templateUrl: './portfoliover.component.html',
  styleUrls: ['./portfoliover.component.css']
})
export class PortfolioverComponent implements OnInit {
  ver:boolean=false;
  constructor(private autenticacionservicio:AutenticacionService) { }

  ngOnInit(): void {
    this.autenticacionservicio.cerrarSesion();
  }
  loginboton(valor:boolean){
    this.ver=valor;
  }
  cerrarbonton(valor:boolean){
    this.ver=valor;
  }
}
