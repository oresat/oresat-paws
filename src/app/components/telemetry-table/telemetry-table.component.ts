import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

interface TelemetryFrame {
  id: number,
  received_at: string,
  invalid_count: number,
  sensor_used: number,
  vector_body_1: number,
  vector_body_2: number,
  vector_body_3: number,
  vector_valid: number,
}

export type SortColumn = keyof TelemetryFrame | '';
export type SortDirection = 'ascending' | 'decending' | '';
const rotate: {[key: string]: SortDirection} = { 'ascending': 'decending', 'decending': '', '': 'ascending' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.ascending]': 'direction === "ascending"',
    '[class.decending]': 'direction === "decending"',
    '(click)': 'rotate()'
  }
})
export class TelemetryTableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'telemetry-table',
  templateUrl: './telemetry-table.component.html',
  styleUrls: ['./telemetry-table.component.sass']
})
export class TelemetryTable {
  @Input() telemetry: Array<TelemetryFrame> = [];

  @ViewChildren(TelemetryTableHeader) headers: QueryList<TelemetryTableHeader>;

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '' || column === '') {
      this.telemetry = this.telemetry;
    } else {
      this.telemetry = [...this.telemetry].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'ascending' ? res : -res;
      });
    }
  }
}
