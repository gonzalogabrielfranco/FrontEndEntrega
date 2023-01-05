import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RedessocialesService} from "../../../shared/servicios/redessociales.service";
import {redesSocialesModel} from "../../../shared/modelo/redessociales.model";

@Component({
  selector: 'app-redessocialeseliminar',
  templateUrl: './redessocialeseliminar.component.html',
  styleUrls: ['./redessocialeseliminar.component.css']
})
export class RedessocialeseliminarComponent implements OnInit {
  @Output() eliminaremitter=new EventEmitter<boolean>();
  formulario = new FormGroup(
    {
      nombre: new FormControl('',[Validators.required]),
      url: new FormControl(''),
      urlImagen: new FormControl('')
    }
  );
  listaredes: redesSocialesModel[];

  constructor(private serviceredes: RedessocialesService) {
  }

  ngOnInit(): void {
    this.serviceredes.getRedesSociales().subscribe((data: redesSocialesModel[]) => {
      this.listaredes = data;
      this.formulario.patchValue({
        nombre: data[0].nombre,
        url: data[0].url,
      });
    });
  }

  eliminar() {
    this.serviceredes.getRedesSociales().subscribe((data: redesSocialesModel[]) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].nombre == this.formulario.value.nombre) {
          if ( confirm("¿Está seguro de eliminar la red social?")) {
            this.serviceredes.eliminarredsociales(data[i].id).subscribe(
              (res) => {
                alert("Se elimino correctamente");
                window.location.reload();
              });
          }
          break;
        }

      }
    });
  }
  cambioestado(){
    this.serviceredes.getRedesSociales().subscribe((data:redesSocialesModel[])=>{
      for (let i = 0; i < data.length; i++) {
        if(data[i].nombre==this.formulario.value.nombre){
          this.formulario.patchValue({
            url:data[i].url,
          });
        }
      }
    });
  }
  cerrar(){
    this.eliminaremitter.emit(false);
  }
}
