import {Usuario} from "./usuario";
import {Publicacion} from "./publicacion";

export interface Report {
    id: number;
    ReportDescription:string;
    UserMain: Usuario;
    PostReported: Publicacion;
}
