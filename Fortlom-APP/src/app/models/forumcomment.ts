import { Forum } from "./forum";
import { Usuario } from "./usuario";

export interface Forumcomment {
    id:number;
    CommentDescription:string;
    usuario:Usuario;
    forum:Forum;
    Date:string;
}
