import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {redesSocialesModel} from "../../../shared/modelo/redessociales.model";
import {RedessocialesService} from "../../../shared/servicios/redessociales.service";

@Component({
  selector: 'app-redessocialeseditar',
  templateUrl: './redessocialeseditar.component.html',
  styleUrls: ['./redessocialeseditar.component.css']
})
export class RedessocialeseditarComponent implements OnInit {

  @Output() editar=new EventEmitter<boolean>();
  formulario=new FormGroup(
    {
      nombre:new FormControl('',[Validators.required]),
      url:new FormControl('',[Validators.required]),
      urlImagen:new FormControl('')
    }
  );
  listaredes:redesSocialesModel[];
  constructor(private serviceredes:RedessocialesService) {

  }

  ngOnInit(): void {
    this.serviceredes.getRedesSociales().subscribe((data:redesSocialesModel[])=>{
      this.listaredes=data;
      this.formulario.patchValue({
        nombre:data[0].nombre,
        url:data[0].url,
      });
    });
  }

  guardar(){
   this.serviceredes.getRedesSociales().subscribe((data:redesSocialesModel[])=>{
     for (let i = 0; i < data.length; i++) {
       if(data[i].nombre==this.formulario.value.nombre){
         let red={
           id:data[i].id,
            nombre:data[i].nombre,
            url:this.formulario.value.url,
            urlImagen:data[i].urlImagen
         }
         this.serviceredes.actualizarRedesSociales(red).subscribe((data:any)=>{
           alert("Se guardo correctamente");
           window.location.reload();
         });
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
    this.editar.emit(false);
  }
}
