type Session = string;
type Url = string; 
type Title = string;
type Album = string;

export class Record {
    constructor(
      public session: Session,
      public title: Title,
      public album: Album,
      public url: Url
    ) {
      // Vous pouvez ajouter ici des validations pour session et url si nécessaire
      if (!this.isValidSession(session)) {
        throw new Error("Invalid session format.");
      }
      if (!this.isValidUrl(url)) {
        throw new Error("Invalid URL.");
      }
    }
  
    // Méthode pour valider le format de session
    public isValidSession(session: Session): boolean {
      const regexPattern = /^\d{4}>\d{2}>\d{2}$/;
      return regexPattern.test(session);
    }
  
    // Méthode pour valider le format de l'URL
    public isValidUrl(url: Url): boolean {
      const regexPattern = /^https?:\/\/\w+/;
      return regexPattern.test(url);
    }
}
  