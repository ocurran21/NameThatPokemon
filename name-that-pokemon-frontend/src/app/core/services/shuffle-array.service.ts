import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ShuffleArrayService {
  shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((i, j) => i.sort - j.sort)
      .map(({ value }) => value);
  }
}