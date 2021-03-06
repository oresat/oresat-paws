import { Component, OnInit } from '@angular/core';
import { UltraService, Telemetry } from 'src/app/services/ultra.service';

@Component({
  selector: 'telemetry-page',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.sass']
})

export class TelemetryPage implements OnInit {
  telemetry: Array<Telemetry>;

  constructor(private ultra: UltraService){
    this.ultra.get_telemetry().subscribe(
      data => {
        this.telemetry = data
      },
      error => {
        this.telemetry = [],
        console.error(`Failed to get telemetry: ${error}`);
      }
    );
  }

  ngOnInit(): void {}
}
