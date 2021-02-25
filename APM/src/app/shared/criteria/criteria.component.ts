import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "pm-criteria",
  templateUrl: "./criteria.component.html",
  styleUrls: ["./criteria.component.css"],
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  hitMessage: string;
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  @ViewChild("filterElement") filterElementRef: ElementRef;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private _listFilter: string;
  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value); // send to parent
  }

  constructor() {}

  ngOnInit() {}

  // this only executes when one of the @Input properties is chanaged by the parent component
  // cannot be used to watch changes on local properties
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hitCount"] && !changes["hitCount"].currentValue) {
      this.hitMessage = "No matches found";
    } else {
      this.hitMessage = "Hits: " + this.hitCount;
    }
  }
  ngAfterViewInit(): void {
    // filterElementRef would not have been available in the
    // ngOnInit() hook.
    this.filterElementRef.nativeElement.focus();
  }
}
