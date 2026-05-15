import { Component, EventEmitter, Output, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './city-create.component.html'
})
export class CityCreateComponent implements OnInit {

  private countryService = inject(CountryService);
  private cityService = inject(CityService);

  @Output() cityCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  cityName: string = '';
  selectedCountryId: number = 0;
  countries: Country[] = [];

  ngOnInit(): void {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  onSave(): void {

    const city = {
      name: this.cityName
    };

    this.cityService.createCity(this.selectedCountryId, city)
      .subscribe(() => {
        this.cityCreated.emit();

        this.cityName = '';
        this.selectedCountryId = 0;
      });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}