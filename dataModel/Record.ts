import { Session, Title, Album, Url, Artist } from "../rehearse/types";

export class Record {
  private session: Session;
  private title: Title;
  private album: Album;
  private url: Url;
  private artist: Artist;

  /**
   * Crée une instance de Record.
   * @param {Session} session - L'identifiant de la session.
   * @param {Title} title - Le titre de l'enregistrement.
   * @param {Album} album - L'album associé à l'enregistrement.
   * @param {Url} url - L'URL de l'enregistrement.
   * @param {Artist} artist - L'artiste associé à l'enregistrement.
   */
  constructor(session: Session, title: Title, album: Album, url: Url, artist: Artist) {
    this.session = session;
    this.title = title;
    this.album = album;
    this.url = url;
    this.artist = artist;
  }
  
  /**
   * Valide le format de la session.
   * @param {Session} session - La session à valider.
   * @returns {boolean} True si le format est valide, sinon False.
   * @private
   */
  private isValidSession(session: Session): boolean {
      const regexPattern = /^\d{4}-\d{2}-\d{2}-\d{2}$/;
      return regexPattern.test(session);
  }

  /**
   * Valide l'URL fournie.
   * @param {Url} url - L'URL à valider.
   * @returns {boolean} True si l'URL est valide, sinon False.
   * @private
   */
  private isValidUrl(url: Url): boolean {
      const regexPattern = /^https?:\/\/\w+/;
      return regexPattern.test(url);
  }

  /**
   * Récupère la session.
   * @returns {Session} La session actuelle.
   */
  public getSession(): Session {
      return this.session;
  }

  /**
   * Définit une nouvelle session après validation.
   * @param {Session} value - La nouvelle valeur de la session.
   * @throws {Error} Si le format de la session n'est pas valide.
   */
  public setSession(value: Session) {
      if (!this.isValidSession(value)) {
          throw new Error("Invalid session format.");
      }
      this.session = value;
  }

  /**
   * Récupère le titre.
   * @returns {Title} Le titre actuel.
   */
  public getTitle(): Title {
      return this.title;
  }

  /**
   * Définit un nouveau titre.
   * @param {Title} value - Le nouveau titre.
   */
  public setTitle(value: Title) {
      this.title = value;
  }

  /**
   * Récupère l'album.
   * @returns {Album} L'album actuel.
   */
  public getAlbum(): Album {
      return this.album;
  }

  /**
   * Définit un nouvel album.
   * @param {Album} value - Le nouvel album.
   */
  public setAlbum(value: Album) {
      this.album = value;
  }

  /**
   * Récupère l'URL.
   * @returns {Url} L'URL actuelle.
   */
  public getUrl(): Url {
      return this.url;
  }

  /**
   * Définit une nouvelle URL après validation.
   * @param {Url} value - La nouvelle URL.
   * @throws {Error} Si l'URL n'est pas valide.
   */
  public setUrl(value: Url) {
      if (!this.isValidUrl(value)) {
          throw new Error("Invalid URL.");
      }
      this.url = value;
  }

  /**
   * Récupère l'artiste.
   * @returns {Artist} L'artiste actuel.
   */
  public getArtist(): Artist {
      return this.artist;
  }

  /**
   * Définit un nouvel artiste.
   * @param {Artist} value - Le nouvel artiste.
   */
  public setArtist(value: Artist) {
      this.artist = value;
  }
}
