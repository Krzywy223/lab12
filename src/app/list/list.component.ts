import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonService } from '../services/person.service';
import { Person } from '../models/person';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {

  persons: Person[] = [];

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getAll().subscribe({
      next: (persons) => {
        this.persons = persons;
      },
      error: (error) => {
        console.error('Błąd podczas pobierania listy osób', error);
        alert('Nie udało się pobrać listy osób z serwera.');
      }
    });
  }

  goToAdd(): void {
    this.router.navigate(['/add']);
  }

  goToDetails(person: Person): void {
    console.log('goToDetails person=', person); // debug na chwilę
    if (person.id != null) {
      this.router.navigate(['/details', person.id]);
    }
  }

  delete(person: Person): void {
    if (person.id == null) {
      return;
    }

    if (!confirm('Na pewno chcesz usunąć tę osobę?')) {
      return;
    }

    this.personService.delete(person.id).subscribe({
      next: () => {
        // po udanym usunięciu odśwież listę
        this.loadPersons();
      },
      error: (error) => {
        console.error('Błąd podczas usuwania osoby', error);
        alert('Nie udało się usunąć osoby.');
      }
    });
  }
}
