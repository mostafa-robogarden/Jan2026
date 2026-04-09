import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, peopleOutline, settingsOutline, add } from 'ionicons/icons';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  'home-outline': homeOutline,
  'people-outline': peopleOutline,
  'settings-outline': settingsOutline,
  'add': add
});
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
