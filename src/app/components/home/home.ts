import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

 partenaires = [
    { nom: 'Partenaire 1', logo: 'https://avatars.mds.yandex.net/i?id=b48acf55d8cf8d52253655f2af76c11fc0599925-9858868-images-thumbs&n=13', description: 'Description du partenaire 1' },
    { nom: 'Partenaire 2', logo: 'https://avatars.mds.yandex.net/i?id=472a0d927a7fa5f4c3d6374b65495347996031c9-4102221-images-thumbs&n=13', description: 'Description du partenaire 2' },
    { nom: 'Partenaire 3', logo: 'https://avatars.mds.yandex.net/i?id=1c11d5c0a3c5fc253d48c55a52acadec52bc372c-12480668-images-thumbs&n=13', description: 'Description du partenaire 3' },
    { nom: 'Partenaire 4', logo: 'https://avatars.mds.yandex.net/i?id=900d08bc961366b9c164e5ef736da1840196b017-5895977-images-thumbs&n=13', description: 'Description du partenaire 4' },
    { nom: 'Partenaire 5', logo: 'https://avatars.mds.yandex.net/i?id=828fb84cbe584d32a6d980d4c8c27a22-5591414-images-thumbs&n=13', description: 'Description du partenaire 5' },
    { nom: 'Partenaire 6', logo: 'https://avatars.mds.yandex.net/i?id=5315920e16a78b76c7fde3dcc768a4d8caa41a09-4437502-images-thumbs&n=13', description: 'Description du partenaire 6' },
    { nom: 'Partenaire 7', logo: 'https://avatars.mds.yandex.net/i?id=393598c1ed3479b9baaccb1a45295ce105fe5833-16307997-images-thumbs&n=13', description: 'Description du partenaire 7' },
    { nom: 'Partenaire 8', logo: 'https://avatars.mds.yandex.net/i?id=597cec85b5aaea6c77df133b81c72fc2a01b8d24-10289922-images-thumbs&n=13', description: 'Description du partenaire 8' },
    { nom: 'Partenaire 9', logo: 'https://avatars.mds.yandex.net/i?id=7ae77da9f43940d648364d971f15a342e9c8cf56-5427399-images-thumbs&n=13', description: 'Description du partenaire 9' },
    { nom: 'Partenaire 10', logo: 'https://avatars.mds.yandex.net/i?id=8007e7167627e45095da622269a9437d8f46397d-5094289-images-thumbs&n=13', description: 'Description du partenaire 10' }
  ];



}
