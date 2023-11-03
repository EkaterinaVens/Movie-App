const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTcwMjE4NGRhYTg3NjU2ZTM5NzZjNjE1NTA4MjRkOCIsInN1YiI6IjVmMGFjMGNjNTViYzM1MDAzMzI4MTQ0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YBnt-_Z1GfzyFiMd7lb5AliXdli5Tsg5PtDcVEHxueg';

const url = 'https://api.themoviedb.org/3/';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

const optionsAddRating = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ value: 8.5 }),
};

export default class MovieService {
  static async getResource(name, page = 1) {
    const res = await fetch(
      `${url}search/movie?query=${name}&include_adult=false&language=en-US&page=${page}`,
      options,
    );
    if (!res.ok) {
      throw new Error(
        `Could not feath ${url}search/movie?query=${name}&include_adult=false&language=en-US&page=${page}, received ${res.status}`,
      );
    }
    const body = await res.json();
    return body;
  }

  static async getMovies(name, page = 1) {
    const res = await MovieService.getResource(name, page);

    return {
      items: res.results,
      count: res.total_results,
      pages: res.total_pages,
    };
  }

  static async createSession() {
    const res = await fetch(`${url}authentication/guest_session/new`, options);
    if (!res.ok) {
      throw new Error(`Could not feath ${url}authentication/guest_session/new`);
    }
    const body = await res.json();
    return body;
  }

  static async addRating(id, session) {
    const res = await fetch(
      `${url}movie/${id}/rating?api_key=f9702184daa87656e3976c61550824d8&guest_session_id=${session}`,
      optionsAddRating,
    );
    const body = await res.json();
    return body;
  }

  static async getRatesMovies(session) {
    const res = await fetch(
      `${url}guest_session/${session}/rated/movies?api_key=f9702184daa87656e3976c61550824d8`,
      options,
    );
    const body = await res.json();
    return body;
  }

  static async getGenres() {
    const res = await fetch(`${url}genre/movie/list?language=en`, options);
    const body = await res.json();
    return body;
  }
}
