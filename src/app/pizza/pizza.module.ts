import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';

import { StoreModule } from '@ngrx/store';
import { pizzaReducer } from './pizza.reducer';
import { PizzaEffects } from './pizza.effects';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('pizzas', pizzaReducer),
    EffectsModule.forFeature([PizzaEffects])
  ],
  declarations: [PizzaOrderComponent],
  exports: [PizzaOrderComponent]
})
export class PizzaModule { }
