import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Params, RouterModule } from '@angular/router';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { TurnsService } from '../turns.service';
import { TurnModel } from './turn.model';

@Component({
    selector: 'app-turns',
    standalone: true,
    imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        RouterModule,
        CommonModule,
    ],
    templateUrl: './turns.component.html',
    styleUrl: './turns.component.sass'
})
export class TurnsComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly turnsService: TurnsService,
    ) { }

    displayedColumns: string[] = ['closedAt', 'food', 'state', 'actions']
    dataSource: TurnModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10]
    pageIndex: number = 0
    params: Params = { page: 1 }

    ngOnInit() {
        this.toolbarService.setTitle('Turnos')
        this.fetchData()
    }

    onCloseTurn(turn: any) {
        turn.closed_at = new Date().toISOString().split('T')[0]
        this.turnsService.update(turn, turn.id).subscribe(() => {
            this.fetchData()
            this.toolbarService.showMessage('Se han guardado los cambios')
        })
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        Object.assign(this.params, { page: this.pageIndex + 1 })
        this.fetchData()
    }

    fetchData() {
        this.toolbarService.loadingBarStart()
        this.turnsService.getTurnsByPage(this.params).subscribe(res => {
            this.toolbarService.loadingBarFinish()
            console.log(res);
            this.dataSource = res.data
            this.length = res.total
        })
    }

}
