import { ActionReducerMap } from '@ngrx/store';
import { pizzaReducer } from '../pizza/pizza.reducer';

export const reducers: ActionReducerMap<any> = {
    pizzas: pizzaReducer
};