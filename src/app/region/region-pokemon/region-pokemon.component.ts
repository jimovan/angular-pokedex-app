import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Region } from 'src/app/region/region';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-region-pokemon',
  templateUrl: './region-pokemon.component.html',
  styleUrls: ['./region-pokemon.component.scss'],
})
export class RegionPokemonComponent implements OnInit {
  pokemon: any[] = [];
  region!: Region;
  pageLimit: number = 10;
  currentPage: number = 1;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(startIndex: number = 0): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemonService.getRegionById(id).subscribe((region: Region) => {
      this.region = region;

      this.pokemonService
        .getPokemonList(this.region.startIndex, this.pageLimit)
        .subscribe((response: any) => {
          let pokemonRequest = response.results.map((result: any) => {
            return this.pokemonService.getPokemonByUrl(result.url);
          });

          forkJoin(pokemonRequest).subscribe((pokemon) => {
            this.pokemon = pokemon;
            this.sortPokemon();
          });
        });
    });
  }

  sortPokemon(): void {
    this.pokemon.sort((first, second) => first.id - second.id);
  }

  nextPage(): void {}
}
