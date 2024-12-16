import { Component } from '@angular/core';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-subscription',
    standalone: true,
    imports: [MatIconModule, MatCardModule, MatDividerModule],
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.sass']
})
export class SubscriptionComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
    ) { }

    ngOnInit(): void {
        this.toolbarService.setTitle('Renueve la suscripcion')
    }

}
