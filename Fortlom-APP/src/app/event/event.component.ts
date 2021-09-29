import {Component , OnInit, ViewChild} from '@angular/core';
import {Event} from '../models/event';
import {EventService} from '../services/event/event.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import * as _ from 'lodash';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventdata: Event;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','EventName','EventDescription','ArtistID','Likes'];

  @ViewChild('studentForm', {static: false})
  eventForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  isEditMode = false;

  constructor(private eventService: EventService) {
    this.eventdata = {} as Event;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit():void{
    this.dataSource.paginator = this.paginator;
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  deleteItem(id: number) {
    this.eventService.delete(id).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.filter((o: Event) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addEvent() {
    this.eventService.create(this.eventdata).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  editItem(element: Event) {
    this.eventdata = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.eventForm.resetForm();
  }

  updateEvent() {
    this.eventService.update(this.eventdata.id, this.eventdata).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Event) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
      this.cancelEdit();
    });
  }

  onSubmit() {
    if (this.eventForm.form.valid) {
      if (this.isEditMode) {
        this.updateEvent();
      } else {
        this.addEvent();
      }
    } else {
      console.log('Invalid data');
    }
  }

}