import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { Doctor } from 'src/app/models';
import { loadDoctors, loadSingleDoctor } from 'src/app/store/actions';
import { searchDoctorSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';

  doctors$: Observable<Doctor[] | undefined> | undefined;
  doctorName: string | undefined;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadDoctors());
    this.doctors$ = this.store.select(searchDoctorSelector);
  }

  searchDoctor() {
    if (!this.firstName && !this.lastName) {
      return;
    }

    this.store.dispatch(
      loadSingleDoctor({ firstName: this.firstName, lastName: this.lastName })
    );

    this.firstName = '';
    this.lastName = '';
  }

  bookConsultation(entityNo: number) {
    this.router.navigate([`booking`, entityNo]);
  }
}
