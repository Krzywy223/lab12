import { Injectable } from '@angular/core';
import { Person } from '../models/person';

const STORAGE_KEY = 'persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  private loadFromStorage(): Person[] {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) {
      return [];
    }
    try {
      return JSON.parse(json) as Person[];
    } catch (e) {
      console.error('Błąd parsowania danych z localStorage', e);
      return [];
    }
  }

  private saveToStorage(persons: Person[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
  }

  getAll(): Person[] {
    return this.loadFromStorage();
  }

  getByIndex(index: number): Person | undefined {
    const persons = this.loadFromStorage();
    return persons[index];
  }

  add(person: Person): void {
    const persons = this.loadFromStorage();
    persons.push(person);
    this.saveToStorage(persons);
  }

  delete(index: number): void {
    const persons = this.loadFromStorage();
    if (index >= 0 && index < persons.length) {
      persons.splice(index, 1);
      this.saveToStorage(persons);
    }
  }
}
