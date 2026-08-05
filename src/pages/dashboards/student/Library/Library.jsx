import Badge from '../../../../components/Badge/Badge.jsx'
import Card from '../../../../components/Card/Card.jsx'
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
  return (
    <div className="student-page">
      <div className="student-page__header">
        <div className="student-page__heading">
          <h1>Bibliothèque</h1>
          <p>Ouvrages empruntés, disponibles et réservés.</p>
        </div>
      </div>

      <div className="library-grid">
        {libraryBooks.map((book) => (
          <Card key={book.id}>
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
    </div>
  )
}

export default Library
