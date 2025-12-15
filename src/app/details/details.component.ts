import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { PersonService } from '../services/person.service';
import { Person } from '../models/person';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {

  person: Person | null = null;
  loading = true;
  notFound = false;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(pm => pm.get('id')),
      tap(idParam => console.log('DETAILS idParam=', idParam)),
      map(idParam => Number(idParam)),
      distinctUntilChanged(),
      tap(() => {
        this.loading = true;
        this.notFound = false;
      }),
      switchMap((id) => {
        console.log('DETAILS id=', id);

        if (!Number.isInteger(id) || id < 1) {
          this.notFound = true;
          this.loading = false;
          return of(null);
        }

        return this.personService.get(id).pipe(
          tap(p => console.log('DETAILS got person', p)),
          catchError((err) => {
            console.error('DETAILS error', err);
            if (err.status === 404) this.notFound = true;
            return of(null);
          })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((p) => {
      console.log('DETAILS subscribe set person =', p);
      this.person = p;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  backToList(): void {
    this.router.navigate(['/']);
  }
}
