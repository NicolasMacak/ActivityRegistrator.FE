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
    scopes: [
      "https://activityRegistrator.onmicrosoft.com/web-app-api/api.read",
      "https://activityRegistrator.onmicrosoft.com/web-app-api/api.write"
    ]
  });
    }

    acquireToken() {
        const account = this.msalService.instance.getActiveAccount();

        if (!account) {
            console.error("❌ No active account found. Ensure user is logged in.");
            return;
        }

        this.msalService.acquireTokenSilent({
            account: account,
            scopes: [
                "https://activityRegistrator.onmicrosoft.com/web-app-api/api.read",
                "https://activityRegistrator.onmicrosoft.com/web-app-api/api.write"
            ]
            }).subscribe({
            next: result => {
                console.log("✅ Access Token Acquired:", result.accessToken);
                // Use in Authorization header: Bearer <token>
            },
            error: error => {
                console.error("❌ Token acquisition failed", error);
                this.msalService.acquireTokenRedirect({
                scopes: [
                    "https://activityRegistrator.onmicrosoft.com/web-app-api/api.read",
                    "https://activityRegistrator.onmicrosoft.com/web-app-api/api.write"
                ]
                });
            }
        });
    }

    title = 'Login'
}