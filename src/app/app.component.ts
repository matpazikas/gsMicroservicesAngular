import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DataExplorerComponent } from "./components/data-explorer/data-explorer.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, DataExplorerComponent, HttpClientModule]
})
export class AppComponent {
  title = 'gsMicroservice';
}
