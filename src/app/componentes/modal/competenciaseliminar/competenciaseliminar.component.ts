import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HardandsoftskillModel} from "../../../shared/modelo/hardandsoftskill.model";
import {FormControl, FormGroup} from "@angular/forms";
import {HardsoftskillService} from "../../../shared/servicios/hardsoftskill.service";

@Component({
  selector: 'app-competenciaseliminar',
  templateUrl: './competenciaseliminar.component.html',
  styleUrls: ['./competenciaseliminar.component.css']
})
export class CompetenciaseliminarComponent implements OnInit {
  @Output() eventoCompetencia = new EventEmitter<string>();
  lista: HardandsoftskillModel[];
  var: HardandsoftskillModel;
  formulario = new FormGroup(
    {
      nombre: new FormControl(''),
      porcentaje: new FormControl(0),
      seleccionado: new FormControl(''),
    });
  constructor(private serviceHardAndSoftSkil: HardsoftskillService) { }
  desactivado:boolean = true;
  ngOnInit(): void {
    this.serviceHardAndSoftSkil.getHardsoftskill().subscribe(
      (res: HardandsoftskillModel[]) => {
        this.lista = res;
        this.formulario.patchValue({
          nombre: this.lista[0]?.nombre || '',
          porcentaje: this.lista[0]?.porcentaje || 0,
          seleccionado: this.lista[0]?.nombre || ''
        })
      }
    );
  }
  cerrarVentana() {
    this.eventoCompetencia.emit("eliminar");
  }
  cambioestado() {
    let hardandsoftskillModel = this.lista.find(x => x.nombre == this.formulario.value.seleccionado);
    this.formulario.patchValue({
      nombre: hardandsoftskillModel?.nombre || '',
      porcentaje: hardandsoftskillModel?.porcentaje || 0
    });
  }
  eliminarCompetencia(){
    let id = this.lista.find(x => x.nombre == this.formulario.value.seleccionado)?.id;
    if ( confirm("¿Está seguro de eliminar la competencia?")) {
      this.serviceHardAndSoftSkil.eliminarHardAndSoftSkill(id).subscribe(
        (res) => {
          alert("Se elimino correctamente");
          window.location.reload();
        });
    }

  }
}
