import { Forum } from "./forum";
import { Usuario } from "./usuario";

export interface Forumcomment {
    id:number;
    CommentDescription:string;
    ForumID:Forum;
    Date:string;
}
