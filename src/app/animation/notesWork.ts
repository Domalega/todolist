import { trigger, transition, style, animate } from '@angular/animations';

export const noteWorks = trigger('slideOut', [
  transition(':enter', [
    style({ opacity: 0, height: '0' }),
    animate('400ms ease-in'),
  ]),
]);
