import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width:'100%' }), { optional: true }),
    // query('.block', style({opacity: 0})),

    group([
      query(':enter', [
        style({ transform: 'translateX(-150%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-50%)' }))
      ], { optional: true }),

      query(':leave', [
        style({ transform: 'translateX(-50%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(50%)' }))
      ], { optional: true }),
    ])
  ])
])
