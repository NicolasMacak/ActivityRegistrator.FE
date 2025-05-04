import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./auth.service";
import { MsalService } from "@azure/msal-angular";

@Component({
    selector: 'login',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    constructor(private authService: AuthService, private msalService: MsalService) { }

    email: string = 'log';
    password: string = 'pass';

    ngOnInit(): void {
        this.msalService.initialize().subscribe({ // Has to be initialized before request azure B2C
            next: (result) => {
                console.log('MSAL initialized successfully:', result);
            },
            error: (error) => {
                console.error('Error initializing MSAL:', error);
            }
        });
    }

    loginB2C() {
        this.msalService.loginRedirect();
    }

    acquireToken() {
        this.msalService.acquireTokenSilent({ scopes: ["openid", "profile"] }).subscribe({
            next: (result) => {
                console.log("Access Token:", result.accessToken); // This is the token you need
            },
            error: (error) => {
                console.error("Error acquiring token silently:", error);
                // Fallback to interactive login if needed
                this.msalService.loginRedirect({ scopes: ["openid", "profile"] });
            }
        });
    }

    title = 'Login'
}