import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {PersonaService} from "../../../shared/servicios/persona.service";
import {personaModel} from "../../../shared/modelo/persona.model";

@Component({
  selector: 'app-acercadeeditar',
  templateUrl: './acercadeeditar.component.html',
  styleUrls: ['./acercadeeditar.component.css']
})
export class AcercadeeditarComponent implements OnInit {
  @Output() editarmostrar= new EventEmitter<boolean>();
  grupo:FormGroup=new FormGroup(
    {inputacercade: new FormControl("")}
  );
  datos:personaModel;
  constructor(private personaservice:PersonaService) { }

  ngOnInit(): void {
    this.personaservice.getPersonas().subscribe((data:personaModel[])=>{
      this.grupo.get("inputacercade")?.setValue(data[0].descripcion);
    })}
    guardar()
    {
      this.personaservice.getPersonas().subscribe((data:personaModel[])=>{
        this.datos=data[0];
        this.datos.descripcion=this.grupo.get("inputacercade")?.value;
        this.personaservice.actualizarPersona(this.datos).subscribe((data:personaModel)=>{
          this.editarmostrar.emit(false);
          window.alert("Los datos se han guardado correctamente");
          window.location.reload();
        });
      });
    }
    cancelar(){
      this.editarmostrar.emit(false);
    }

}
