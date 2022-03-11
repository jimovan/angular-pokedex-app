import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Region } from 'src/app/region/region';

@Component({
  selector: 'app-region-pokemon',
  templateUrl: './region-pokemon.component.html',
  styleUrls: ['./region-pokemon.component.scss'],
})
export class RegionPokemonComponent implements OnInit {
  pokemon: any[] = [];
  region!: Region;
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pokemonService.getRegionById(id).subscribe((region: Region) => {
      this.region = region;

      this.pokemonService
        .getPokemonList(this.region.startIndex)
        .subscribe((response: any) => {
          response.results.forEach((result: any) => {
            this.pokemonService
              .getPokemonByUrl(result.url)
              .subscribe((pokemon) => {
                this.pokemon.push(pokemon);
              });
          });
        });
    });
  }

  sortPokemon(): void {
    this.pokemon.sort((first, second) => first.id - second.id);
  }
}
