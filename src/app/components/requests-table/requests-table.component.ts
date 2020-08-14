import { Component, OnInit, Input } from '@angular/core';
import { UltraService, Request } from 'src/app/services/ultra.service';

@Component({
  selector: 'requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.sass']
})

export class RequestsTable implements OnInit {
  @Input() requests: Array<Request>;
  loaded: boolean;

  constructor(private ultra_service: UltraService) {
    this.loaded = false;
  }

  ngOnInit(): void {
    const token = this.ultra_service.get_cached_token();
    this.ultra_service.get_all_requests(token).subscribe(
      data => {
        this.requests = data;
        this.loaded = true;
        console.log(`Success: ${data}`);
      },
      error => {
        console.error(`Failed to retrieve requests: ${error}`);
      }
    );
  }

  bool_to_status(is_approved: boolean): string {
    if(is_approved === true) {
      return 'Approved';
    }
    else if(is_approved === false) {
      return 'Denied';
    }
    else {
      return 'Pending';
    }
  }

  edit_request() {
    console.log(`Trying to edit request: ${1}`);
  }
}
