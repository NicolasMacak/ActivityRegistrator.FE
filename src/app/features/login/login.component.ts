import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector: 'login',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent{
    constructor(private authService: AuthService) {}

    email: string = 'log';
    password: string = 'pass';

    loginByGoole(){
        this.authService.login("babka", "dedko");
    }

    title = 'Login'
}