// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id: string;
  name?: string;
  // TODO fleiri týpur
  birthYear?: string;
  eyeColor?: string;
  hairColor?: string;
  height?: number;
  mass?: number;
}

// TODO hér ættum við að útbúa interface fyrir öll gögn sem við vinnum með (t.d. IFilm, IPaging)
// og svör sem við fáum frá GraphQL endapunkti

export interface ICharacterGet {
  person: ICharacter;
}

export interface ICharacterConnection {
  characters: Array<ICharacter>;
}

export interface IFilm {
  title: string;
  episodeID: number;
  openingCrawl: string;
  characterConnection: ICharacterConnection;
}

export interface IAllFilms {
  allFilms: IFilms;
}

interface IFilms {
  films: Array<IFilm>;
}

interface IAllCharacters {
  people: Array<ICharacter>;
  pageInfo: IPaging;
}

export interface IPeopleResponse {
  allPeople: IAllCharacters;
}

interface IPaging {
  endCursor: string;
  hasNextPage: boolean;
}