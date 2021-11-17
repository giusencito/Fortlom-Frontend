import { Component, OnInit } from '@angular/core';
import {AppRoutingModule} from "../app-routing.module";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  constructor(private $route: ActivatedRoute) { }
  ngOnInit() {
    console.log(+this.$route.snapshot.params['artistid']);
  }
}
