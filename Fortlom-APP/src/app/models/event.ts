import { Artist } from "./artist";

export interface Event {
    id:number;
    eventName:string;
    eventDescription:string;
    ArtistID:Artist;
    likes:number;
}
