import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

// S tymto suborom sa mozno vobec nepracuje. Zmazat
export class AppComponent implements OnInit {
  title = 'Registrator';

  constructor(private msAuthService: MsalService) { }

  ngOnInit(): void {
    this.msAuthService.initialize().subscribe({
      next: (result) => {
        console.log('MSAL initialized successfully:', result);
      },
      error: (error) => {
        console.error('Error initializing MSAL:', error);
      }
    });
  }
}

