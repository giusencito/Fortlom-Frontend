import { Publicacion } from "./publicacion";
import { Usuario } from "./usuario";

export interface Comment {
    id: number;
    CommentDescription: string;
    publication: Publicacion;
    usuario:Usuario;
    Date:string;
}
