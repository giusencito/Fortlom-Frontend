import { Artist } from "./artist";

export interface Event {
    id:number;
    EventName:string;
    EventDescription:string;
    artist:Artist;
    Likes:number;
}
