import {proyectoModel} from "./proyecto.model";
import {educacionModel} from "./educacion.model";
import {HardandsoftskillModel} from "./hardandsoftskill.model";
import {redesSocialesModel} from "./redessociales.model";

export interface personaModel{
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  titulo: string;
  fechaNacimiento: string;
  residencia: string;
  descripcion: string;
  urlImagenPerfil: string;
  urlImagenPortada: string;
  proyectos: proyectoModel[];
  educacion: educacionModel[];
  hardandsoftskill: HardandsoftskillModel[];
  redesSociales: redesSocialesModel[];

}

