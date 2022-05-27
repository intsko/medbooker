import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Booking, EventModel, Status } from 'src/app/models';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestCardComponent implements OnInit {
  @Input() booking: Booking | undefined;
  @Output() onStatusChange = new EventEmitter<EventModel>();

  status = Status;

  constructor() {}

  ngOnInit() {}

  updateBooking(status: Status, id: number) {
    if (id) {
      this.onStatusChange.emit({
        status: status,
        id: id,
      });
    }
  }
}
