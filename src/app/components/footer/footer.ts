import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule,  TranslateModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

}
