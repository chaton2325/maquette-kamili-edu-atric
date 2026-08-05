import './Pagination.css'

function range(start, end) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

function pageNumbers({ current, total }) {
  if (total <= 7) return range(1, total)

  const pages = new Set([1, total, current - 1, current, current + 1])
  if (current <= 3) {
    ;[2, 3, 4].forEach((n) => pages.add(n))
  }
  if (current >= total - 2) {
    ;[total - 3, total - 2, total - 1].forEach((n) => pages.add(n))
  }

  const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const withEllipsis = []
  let prev = 0
  for (const n of sorted) {
    if (prev && n - prev > 1) withEllipsis.push('…')
    withEllipsis.push(n)
    prev = n
  }
  return withEllipsis
}

function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
  ariaLabel = 'Pagination',
  className = '',
}) {
  const pages = pageNumbers({ current: page, total: totalPages })
  const go = (n) => {
    if (n >= 1 && n <= totalPages && n !== page) onPageChange?.(n)
  }

  if (totalPages <= 1) return null

  return (
    <nav className={`pagination ${className}`.trim()} aria-label={ariaLabel}>
      <button
        type="button"
        className="pagination__arrow"
        aria-label="Page précédente"
        disabled={page === 1}
        onClick={() => go(page - 1)}
      >
        ←
      </button>

      <ul className="pagination__list">
        {pages.map((entry, index) =>
          entry === '…' ? (
            <li key={`ellipsis-${index}`} className="pagination__ellipsis">
              …
            </li>
          ) : (
            <li key={entry}>
              <button
                type="button"
                className={[
                  'pagination__page',
                  entry === page ? 'pagination__page--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={entry === page ? 'page' : undefined}
                aria-label={`Page ${entry}`}
                onClick={() => go(entry)}
              >
                {entry}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="pagination__arrow"
        aria-label="Page suivante"
        disabled={page === totalPages}
        onClick={() => go(page + 1)}
      >
        →
      </button>
    </nav>
  )
}

export default Pagination