import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HardandsoftskillModel} from "../../../shared/modelo/hardandsoftskill.model";
import {HardsoftskillService} from "../../../shared/servicios/hardsoftskill.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-competencias-editar',
  templateUrl: './competencias-editar.component.html',
  styleUrls: ['./competencias-editar.component.css']
})
export class CompetenciasEditarComponent implements OnInit {
  @Output() eventoCompetencia = new EventEmitter<string>();
  lista: HardandsoftskillModel[];
  var: HardandsoftskillModel;
  formulario = new FormGroup(
    {
      nombre: new FormControl('',[Validators.required]),
      porcentaje: new FormControl(0,[Validators.required,Validators.max(100),Validators.min(0)]),
      seleccionado: new FormControl(''),
    });

  constructor(private serviceHardAndSoftSkil: HardsoftskillService) {
  }

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
    this.eventoCompetencia.emit("editar");
  }

  cambioestado() {
    let hardandsoftskillModel = this.lista.find(x => x.nombre == this.formulario.value.seleccionado);
    this.formulario.patchValue({
      nombre: hardandsoftskillModel?.nombre || '',
      porcentaje: hardandsoftskillModel?.porcentaje || 0
    });
  }

  guardarCompenencia() {
    let skill = {
      id: this.lista.find(x => x.nombre == (this.formulario.value.seleccionado as string))?.id,
      nombre: this.formulario.value.nombre as string,
      porcentaje: this.formulario.value.porcentaje as number
    }
    this.serviceHardAndSoftSkil.actualizarHardAndSoftSkill(skill).subscribe(
      (res) => {
        console.log(res);
        alert("Se actualizo correctamente");
        window.location.reload();
      }
    );
  }
}
