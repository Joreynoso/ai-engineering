import styles from './Pagination.module.css'

export function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const handlePrevClick = (event) => {
    event.preventDefault()
    if (!isFirstPage) onPageChange(currentPage - 1)
  }

  const handleNextClick = (event) => {
    event.preventDefault()
    if (!isLastPage) onPageChange(currentPage + 1)
  }

  const handleChangePage = (event) => {
    event.preventDefault()
    const page = Number(event.currentTarget.dataset.page)
    if (page !== currentPage) onPageChange(page)
  }

  const buildPageUrl = (page) => {
    const url = new URL(window.location)
    url.searchParams.set('page', page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }

  return (
    <nav className={styles.pagination} aria-label="Navegación de páginas">
      <a
        href={buildPageUrl(currentPage - 1)}
        className={isFirstPage ? styles.disabled : ''}
        onClick={handlePrevClick}
        aria-label="Página anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </a>

      {pages.map((page) => (
        <a
          key={page}
          data-page={page}
          href={buildPageUrl(page)}
          className={currentPage === page ? styles.isActive : ''}
          onClick={handleChangePage}
        >
          {page}
        </a>
      ))}

      <a
        href={buildPageUrl(currentPage + 1)}
        className={isLastPage ? styles.disabled : ''}
        onClick={handleNextClick}
        aria-label="Página siguiente"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
    </nav>
  )
}
