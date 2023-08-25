import { trigger, transition, style, animate } from '@angular/animations';

export const noteWorks = trigger('slideOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate(
      '0.5s ease-out',
      style({ opacity: 0, transform: 'translateY(20px)' })
    ),
  ]),
]);
