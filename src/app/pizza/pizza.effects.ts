import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";

import * as PizzaActions from './pizza.actions';
import { Pizza } from './pizza.reducer';
import { from } from 'rxjs';

@Injectable()
export class PizzaEffects {
    constructor(
        private actions$: Actions,
        private afs: AngularFirestore
    ) {}

    query$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.QUERY),
            switchMap(() => this.afs.collection<Pizza>('pizzas').snapshotChanges()),
            map(pizzas => pizzas.map(pizza => {
                const { type, payload } = pizza;
                const id = payload.doc.id;
                return { id, ...payload.doc.data() };
            })),
            map(pizzas => new PizzaActions.AddAll(pizzas))
        )
    );

    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.CREATE),
            map((action: PizzaActions.Create) => action.pizza),
            switchMap(pizza => {
                const ref = this.afs.doc(`pizzas/${pizza.id}`);
                return from(ref.set(pizza));
            }),
            map(() => {
                return new PizzaActions.Success();
            })
        )
    );

    delete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.DELETE),
            map((action: PizzaActions.Delete) => action.id),
            switchMap(id => {
                const ref = this.afs.doc(`pizzas/${id}`);
                return from(ref.delete());
            }),
            map(() => {
                return new PizzaActions.Success();
            })
        )
    );

    update$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PizzaActions.UPDATE),
            switchMap((action: PizzaActions.Update) => {
                const ref = this.afs.doc(`pizzas/${action.id}`);
                return from(ref.update(action.changes));
            }),
            map(() => {
                return new PizzaActions.Success()
            })
        )
    );
}