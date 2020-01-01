import { Action } from '@ngrx/store';
import { Pizza } from './pizza.reducer';

export const CREATE = '[PIZZA] Create'; 
export const UPDATE = '[PIZZA] Update'; 
export const DELETE = '[PIZZA] Delete';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public pizza: Pizza) {}
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Pizza>
    ) {

    }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: string) {}
}

export type PizzaActions
= Create
| Update
| Delete;