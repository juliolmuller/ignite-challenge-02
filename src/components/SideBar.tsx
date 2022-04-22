import { Button } from './Button';
import { GenreProps } from '../App';

import '../styles/sidebar.scss';

interface SideBarProps {
  activeGenreId: number;
  genres: GenreProps[];
  onChange: (genre: GenreProps) => void;
}

export function SideBar({ activeGenreId, genres, onChange }: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onChange(genre)}
            selected={activeGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
