import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';

import './styles/global.scss';

export interface GenreProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

const DEFAULT_GENRE_ID = 1;

export function App() {
  const [activeGenre, setActiveGenre] = useState<GenreProps>({} as GenreProps);
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<GenreProps[]>('genres').then((response) => {
      const genres = response.data;
      const newActiveGenre = genres.find((genre) => {
        return genre.id === (activeGenre.id ?? DEFAULT_GENRE_ID);
      });

      setGenres(genres);
      setActiveGenre(newActiveGenre as GenreProps);
    });
  }, []);

  useEffect(() => {
    activeGenre.id &&
      api
        .get<MovieProps[]>(`movies/?Genre_id=${activeGenre.id}`)
        .then((response) => setMovies(response.data));
  }, [activeGenre]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        activeGenreId={activeGenre?.id}
        genres={genres}
        onChange={setActiveGenre}
      />

      <Content movies={movies} title={activeGenre.title} />
    </div>
  );
}
