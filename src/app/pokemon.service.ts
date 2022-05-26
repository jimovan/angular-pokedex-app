import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Region } from './region/region';
import { REGIONS } from './region/region-list';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    const regions = of(REGIONS);
    return regions;
  }

  getRegionById(id: number): Observable<Region> {
    const region = REGIONS.find((r) => r.id === id)!;
    return of(region);
  }

  getPokemonList(offset: number, limit: number = 9): Observable<any> {
    return this.http.get(
      `${this.pokeApiUrl}?limit=${limit}&offset=${offset - 1}`
    );
  }

  getPokemonByUrl(url: string) {
    return this.http.get(url);
  }

  getPokemonById(id: number) {
    return this.http.get(`${this.pokeApiUrl}/${id}`);
  }
}
