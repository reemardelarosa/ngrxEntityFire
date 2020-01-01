import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './pizza/pizza.actions';
import * as fromPizza from './pizza/pizza.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pizzas: Observable<any>;

  constructor(private store: Store<fromPizza.State>) {}

  ngOnInit() {
    this.pizzas = this.store.select(fromPizza.selectAll);
  }

  createPizza() {
    const pizza: fromPizza.Pizza = {
      id: new Date().getUTCMilliseconds().toString(),
      size: 'small'
    };

    this.store.dispatch(new actions.Create(pizza));
  }

  updatePizza(id, size) {
    this.store.dispatch(new actions.Update(id, size));
  }

  deletePizza(id) {
    this.store.dispatch(new actions.Delete(id));
  }
}
