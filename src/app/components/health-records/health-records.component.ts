import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-records',
  templateUrl: './health-records.component.html',
  styleUrls: ['./health-records.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthRecordsComponent implements OnInit {
  status = 'Confirmed';

  constructor() {}

  ngOnInit() {}
}
