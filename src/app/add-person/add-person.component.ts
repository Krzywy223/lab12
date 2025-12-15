import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from '../models/person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css',
})
export class AddPersonComponent {

  person: Person = {
    firstName: '',
    familyName: '',
    age: undefined,
    address: {
      city: '',
      street: '',
      postCode: '',
    }
  };

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  save(): void {
    this.personService.add(this.person).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Błąd podczas zapisywania osoby', error);
        alert('Nie udało się zapisać osoby.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
