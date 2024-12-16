import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { PrintIframeComponent } from './print/print-iframe/print-iframe.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MatSidenavModule, ToolbarComponent, SidenavComponent, PrintIframeComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {
    
    title = 'foodwebapp'

}
