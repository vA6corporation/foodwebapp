import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Params, RouterModule } from '@angular/router';
import { ToolbarService } from '../../toolbar/toolbar.service';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';

@Component({
    selector: 'app-businesses',
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
    templateUrl: './businesses.component.html',
    styleUrl: './businesses.component.sass'
})
export class BusinessesComponent {

    constructor(
        private readonly toolbarService: ToolbarService,
        private readonly businessesService: BusinessesService,
    ) { }

    displayedColumns: string[] = ['ruc', 'businessName', 'actions']
    dataSource: BusinessModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10]
    pageIndex: number = 0
    params: Params = { page: 1 }

    ngOnInit() {
        this.fetchData()
        this.toolbarService.setTitle('Empresas')
    }

    onDelete(businessId: string) {
        const ok = confirm('Estas seguro de eliminar?...')
        if (ok) {
            this.toolbarService.loadingBarStart()
            this.businessesService.delete(businessId).subscribe(() => {
                this.toolbarService.loadingBarFinish()
                this.fetchData()
            })
        }
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex
        this.pageSize = event.pageSize
        Object.assign(this.params, { page: this.pageIndex + 1 })
        this.fetchData()
    }

    fetchData() {
        this.toolbarService.loadingBarStart()
        this.businessesService.getBusinessesByPage(this.params).subscribe(res => {
            console.log(res);
            this.toolbarService.loadingBarFinish()
            this.dataSource = res.data
            this.length = res.total
        })
    }

}
