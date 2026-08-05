import { useState } from 'react'
import Card from '../../../../components/Card/Card.jsx'
import Button from '../../../../components/Button/Button.jsx'
import Badge from '../../../../components/Badge/Badge.jsx'
import { children } from '../../../../data/children.js'
import { results } from '../../../../data/results.js'
import '../ParentPage.css'
import './Results.css'

function Results() {
  const [downloaded, setDownloaded] = useState([])

  function handleDownload(id) {
    setDownloaded((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const childrenWithResults = children
    .map((child) => ({
      child,
      entries: results.filter((result) => result.childId === child.id),
    }))
    .filter(({ entries }) => entries.length > 0)

  return (
    <div className="parent-page">
      <div className="parent-page__header">
        <div className="parent-page__heading">
          <h1>Résultats</h1>
          <p>Moyennes, classements et appréciations par trimestre.</p>
        </div>
      </div>

      <div className="results-grid">
        {childrenWithResults.map(({ child, entries }) => (
          <Card key={child.id}>
            <Card.Header>
              {child.avatar} {child.firstName} {child.lastName}
            </Card.Header>
            <Card.Body>
              <div className="results-entries">
                {entries.map((entry) => (
                  <div key={entry.id} className="results-entry">
                    <div className="results-entry__top">
                      <span className="results-entry__term">{entry.term}</span>
                      <span className="results-entry__average">
                        {entry.average}/20
                      </span>
                    </div>
                    <p className="results-entry__rank">Rang : {entry.rank}</p>
                    <p className="results-entry__appreciation">
                      {entry.appreciation}
                    </p>
                    <div className="results-entry__action">
                      {downloaded.includes(entry.id) ? (
                        <Badge variant="success">Bulletin téléchargé</Badge>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDownload(entry.id)}
                        >
                          Télécharger le bulletin
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Results
