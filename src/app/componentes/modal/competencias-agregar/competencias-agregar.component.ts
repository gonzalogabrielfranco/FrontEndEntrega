import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HardsoftskillService} from "../../../shared/servicios/hardsoftskill.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-competencias-agregar',
  templateUrl: './competencias-agregar.component.html',
  styleUrls: ['./competencias-agregar.component.css']
})
export class CompetenciasAgregarComponent implements OnInit {
  @Output() eventoCompetencia= new EventEmitter<string>();
  constructor(private hardandsoftskill:HardsoftskillService) { }
  formulario=new FormGroup(
    {
      nombre: new FormControl('',[Validators.required]),
      porcentaje: new FormControl('',[Validators.required,Validators.max(100),Validators.min(0)])

    }
  )
  ngOnInit(): void {
  }

  cerrarVentana(){
    this.eventoCompetencia.emit("agregar");
  }
  guardarCompenencia() {
    let skill = {
      nombre: this.formulario.value.nombre as string,
      porcentaje: this.formulario.value.porcentaje as string
    }
    this.hardandsoftskill.gurdarHardAndSoftSkill(skill).subscribe(
      (res) => {
        alert("Se guardo correctamente");
        window.location.reload();
      }
    );
  }
}
