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
  ) { }

  ngOnInit(): void {
    this.persons = this.personService.getAll();
  }

  goToAdd(): void {
    this.router.navigate(['/add']);
  }

  goToDetails(index: number): void {
    this.router.navigate(['/details', index]);
  }

  delete(index: number): void {
    this.personService.delete(index);
    this.persons = this.personService.getAll();
  }
}
