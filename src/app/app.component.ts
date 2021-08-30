import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  querySearch: string = "";

  isCollapsed = false;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  onSearchClear(texto: string) {
  }

  searchIn(search) {
    if (search.length == 0) {
      console.log('entro')
      this.router.navigate(
        []);
    } else {

      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { s: search },
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }
  }

}
