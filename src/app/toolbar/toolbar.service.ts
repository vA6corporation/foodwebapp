import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface MenuToolbar {
    id: string
    label: string
    icon: string
    show: boolean
}

@Injectable({
    providedIn: 'root'
})
export class ToolbarService {

    constructor(
        private readonly matSnackBar: MatSnackBar
    ) { }

    private changeTitle$: EventEmitter<string> = new EventEmitter()
    private isLoadingBar$: EventEmitter<boolean> = new EventEmitter()
    private setMenu$: EventEmitter<MenuToolbar[]> = new EventEmitter()
    private onClickMenu$: EventEmitter<string> = new EventEmitter()
    private handleSearch$: EventEmitter<string> = new EventEmitter()

    setTitle(title: string) {
        this.changeTitle$.emit(title)
        document.title = title
    }

    handleChangeTitle() {
        return this.changeTitle$.asObservable()
    }

    handleIsLoadingBar() {
        return this.isLoadingBar$.asObservable()
    }

    handleSetMenu() {
        return this.setMenu$.asObservable()
    }

    handleSearch() {
        return this.handleSearch$.asObservable()
    }

    loadingBarStart() {
        this.isLoadingBar$.emit(true)
    }

    loadingBarFinish() {
        this.isLoadingBar$.emit(false)
    }

    search(key: string) {
        return this.handleSearch$.emit(key)
    }

    setMenu(menus: MenuToolbar[]) {
        this.setMenu$.emit(menus)
    }

    clickMenu(id: string) {
        return this.onClickMenu$.emit(id)
    }

    showMessage(message: string) {
        if (typeof message === 'object') {
            this.matSnackBar.open(JSON.stringify(message), 'Aceptar', {
                duration: 5000,
            })
        } else {
            this.matSnackBar.open(message, 'Aceptar', {
                duration: 5000,
            })
        }
    }

}
