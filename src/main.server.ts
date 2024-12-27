import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// mine
import { LoginComponent } from './app/features/login/login.component';

// const bootstrap = () => bootstrapApplication(AppComponent, config);
const bootstrap = () => bootstrapApplication(LoginComponent, config);

export default bootstrap;
