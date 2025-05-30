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
        this.msalService.initialize().subscribe({
            next: () => {
                // Handle the redirect response
                this.msalService.instance.handleRedirectPromise().then((response) => {
                    if (response && response.account) {
                        // Set the active account after login
                        this.msalService.instance.setActiveAccount(response.account);
                        console.log('Login successful, active account set:', response.account);
                    } else {
                        console.warn('No account found after redirect.');
                    }
                }).catch((error) => {
                    console.error('Error handling redirect:', error);
                });
            },
            error: (error) => {
                console.error('Error initializing MSAL:', error);
            }
        });
    }

    loginB2C() {
        this.msalService.loginRedirect({
            scopes: [ // might be wrong
                "https://activityRegistrator.onmicrosoft.com/web-app-api/api.read",
                "https://activityRegistrator.onmicrosoft.com/web-app-api/api.write",
            ] // Add your API scope here
        });
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