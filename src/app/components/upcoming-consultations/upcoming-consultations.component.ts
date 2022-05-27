import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-consultations',
  templateUrl: './upcoming-consultations.component.html',
  styleUrls: ['./upcoming-consultations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpcomingConsultationsComponent implements OnInit {
  status = 'Confirmed';

  constructor() {}

  ngOnInit() {}
}
