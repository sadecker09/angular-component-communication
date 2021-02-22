import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "pm-criteria",
  templateUrl: "./criteria.component.html",
  styleUrls: ["./criteria.component.css"],
})
export class CriteriaComponent implements OnInit, AfterViewInit {
  listFilter: string;
  @ViewChild("filterElement") filterElementRef: ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    // filterElementRef would not have been available in the
    // ngOnInit() hook.
    this.filterElementRef.nativeElement.focus();
  }
}
