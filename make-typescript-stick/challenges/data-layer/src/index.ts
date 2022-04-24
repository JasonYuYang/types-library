// import { DataEntityMap } from "./index";
export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][];
} & {
  [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (
    id: string
  ) => DataEntityMap[K];
} & {
  [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void;
} & {
  [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (
    arg: DataEntityMap[K]
  ) => DataEntityMap[K];
};

//isDefined type guard
function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {},
  };
  getAllSongs() {
    //當我們用map試圖藉由songKey取得this.#data裡的song資料時typescript出錯誤說假如我們的songKey裡面的東西有可能是undefined，不符合我們在DataStoreMethods裡的屬性不符合。
    //所以我們加上isDefined type guard
    return Object.keys(this.#data.song)
      .map((songKey) => this.#data.song[songKey])
      .filter(isDefined);
    //這裡講師說可以用non-assertion operator aka !
    //一般來說不建議是因為如果是任意字串key的話會有問題?但這裡是key都是從this.#data.song裡來所以是可以相信的來源，理論上應該要有東西在裡面
  }
  getSong(songKey: string): Song {
    const song = this.#data.song[songKey];
    //一樣typesript會提醒有可能有undefinded的情形
    if (!song) throw new Error(`Could not find song with id ${songKey}`);
    return song;
  }
  addSong(s: Song): Song {
    this.#data.song[s.id] = s;
    return s;
  }
  clearSongs(): void {
    this.#data.song = {};
  }
  getAllMovies() {
    return Object.keys(this.#data.movie)
      .map((movieKey) => this.#data.movie[movieKey])
      .filter(isDefined);
  }
  getMovie(movieKey: string): Movie {
    const movie = this.#data.movie[movieKey];

    if (!movie) throw new Error(`Could not find movie with id ${movieKey}`);
    return movie;
  }
  addMovie(m: Movie): Movie {
    this.#data.movie[m.id] = m;
    return m;
  }
  clearMovies(): void {
    this.#data.movie = {};
  }
}
