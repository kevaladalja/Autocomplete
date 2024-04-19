import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith,debounceTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'AUT';

  searchControl = new FormControl();
  showDropdown = false;
  selectedIndex = -1;
  options: string[] = ['apple','banana','cherry','date','grape','fries',];
  filteredOptions: Observable<string[]> | undefined

  constructor(){
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(50),
      map((value: string) => this.filter(value))
      );
  }

  filter(value: string): string[]
  {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // toggleOptions()
  // {
  //   this.showDropdown = !this.showDropdown;
  // }

  selectOption(option: string) {
    this.searchControl.setValue(option);
    this.showDropdown = false;
    this.selectedIndex = -1;
    }

    toggleDropdown()
    {
      this.showDropdown = this.searchControl.value !== '';
    }

    onInputKeyDown(event: KeyboardEvent) {  
      if (event.key === 'ArrowDown') {
        event.preventDefault(); // prevents usual behaviour of event
        const visibleOptions = this.options.filter(option =>
          option.toLowerCase().includes(this.searchControl.value.toLowerCase())
        );                        //  filters options to include only those that match text entered into search bar
        this.selectedIndex = (this.selectedIndex + 1) % visibleOptions.length; //  selects next option and loops back if options end
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const visibleOptions = this.options.filter(option =>
          option.toLowerCase().includes(this.searchControl.value.toLowerCase())
        );
        this.selectedIndex = this.selectedIndex > 0 ? this.selectedIndex - 1 : visibleOptions.length - 1;
      } else if (event.key === 'Enter' && this.selectedIndex !== -1) {
        const visibleOptions = this.options.filter(option =>
          option.toLowerCase().includes(this.searchControl.value.toLowerCase())
        );
        this.selectOption(visibleOptions[this.selectedIndex]);
      }
    }

}
