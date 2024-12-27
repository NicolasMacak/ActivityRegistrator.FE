import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'login',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent{
    title = 'Login'
}