import { useState } from 'react'
import Badge from '../../../../components/Badge/Badge.jsx'
import Card from '../../../../components/Card/Card.jsx'
import EmptyState from '../../../../components/EmptyState/EmptyState.jsx'
import SearchBar from '../../../../components/SearchBar/SearchBar.jsx'
import {
  libraryBooks,
  libraryStatusLabels,
} from '../../../../data/library.js'
import '../StudentPage.css'
import './Library.css'

const statusVariant = {
  emprunte: 'primary',
  disponible: 'success',
  reserve: 'warning',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  })
}

function Library() {
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()
  const filtered = normalized
    ? libraryBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(normalized) ||
          book.author.toLowerCase().includes(normalized),
      )
    : libraryBooks

  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Bibliothèque</h1>
          <p>Ouvrages empruntés, disponibles et réservés.</p>
        </div>
      </div>

      <div className="library-toolbar">
        <SearchBar
          placeholder="Rechercher un titre ou un auteur…"
          value={query}
          onChange={setQuery}
          className="library-toolbar__search"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="library"
          title="Aucun ouvrage trouvé"
          description={`Aucun livre ne correspond à « ${query.trim()} ». Essayez un autre titre ou auteur.`}
          action={
            <button
              type="button"
              className="btn btn--secondary btn--sm"
              onClick={() => setQuery('')}
            >
              Réinitialiser la recherche
            </button>
          }
          className="anim-fade-up"
        />
      ) : (
        <div className="library-grid">
          {filtered.map((book) => (
            <Card key={book.id} className="card--interactive">
              <Card.Body>
                <div className="library-card">
                  <div className="library-card__info">
                    <p className="library-card__title">{book.title}</p>
                    <p className="library-card__author">{book.author}</p>
                    {book.dueDate && (
                      <p className="library-card__due">
                        À retourner le {formatDate(book.dueDate)}
                      </p>
                    )}
                  </div>
                  <Badge variant={statusVariant[book.status]}>
                    {libraryStatusLabels[book.status]}
                  </Badge>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Library
