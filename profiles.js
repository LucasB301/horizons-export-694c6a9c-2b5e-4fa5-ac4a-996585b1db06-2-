export const SAMPLE_PROFILES = [
  {
    id: 1,
    name: 'Sophie',
    age: 25,
    location: 'Paris',
    photo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/694c6a9c-2b5e-4fa5-ac4a-996585b1db06/e8b2af57f88fc2317e7d2aeaf21e8a2d.jpg',
    bio: 'Passionnée de voyages et de photographie. J\'adore découvrir de nouveaux endroits et capturer des moments uniques.',
    meetingType: 'sentimental',
    interests: {
      emploi: { percentage: 20, items: ['Marketing'] },
      loisir: { percentage: 30, items: ['Cuisine'] },
      sport: { percentage: 20, items: ['Yoga'] },
      art: { percentage: 30, items: ['Photographie', 'Musées'] }
    }
  },
  {
    id: 2,
    name: 'Emma',
    age: 28,
    location: 'Lyon',
    photo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/694c6a9c-2b5e-4fa5-ac4a-996585b1db06/43192c993b5f1c027b3a72bc71c6f7ca.jpg',
    bio: 'Artiste dans l\'âme, j\'aime créer et m\'inspirer de tout ce qui m\'entoure. Toujours à la recherche de nouvelles expériences culturelles.',
    meetingType: 'amical',
    interests: {
      emploi: { percentage: 10, items: ['Design'] },
      loisir: { percentage: 20, items: ['Jeux de société'] },
      sport: { percentage: 10, items: ['Danse'] },
      art: { percentage: 60, items: ['Peinture', 'Musique', 'Cinéma'] }
    }
  },
  {
    id: 3,
    name: 'Léa',
    age: 23,
    location: 'Marseille',
    photo: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/694c6a9c-2b5e-4fa5-ac4a-996585b1db06/b6d0bf7929d9fa7066b9c55539808bf0.jpg',
    bio: 'Sportive et nature lover ! J\'adore les randonnées, le surf et passer du temps avec mes animaux de compagnie.',
    meetingType: 'sentimental',
    interests: {
      emploi: { percentage: 15, items: ['Santé'] },
      loisir: { percentage: 25, items: ['Jardinage'] },
      sport: { percentage: 50, items: ['Randonnée', 'Fitness'] },
      art: { percentage: 10, items: ['Photographie'] }
    }
  }
];