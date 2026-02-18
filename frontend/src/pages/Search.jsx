import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

import { Pagination } from '../components/Pagination.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import { JobListings } from '../components/JobListings.jsx'
import styles from './Search.module.css'

const RESULTS_PER_PAGE = 5 // Aumentado ligeramente para mejor vista

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get('technology') || '',
      location: searchParams.get('type') || '',
      experienceLevel: searchParams.get('level') || ''
    }
  })

  const [textToFilter, setTextToFilter] = useState(() => searchParams.get('text') || '')

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get('page'))
    return isNaN(page) ? 1 : Math.max(1, page)
  })

  const [jobs, setJobs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experienceLevel) params.append('level', filters.experienceLevel)

        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString()

        const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs?${queryParams}`)
        const json = await response.json()

        setJobs(json.data)
        setTotal(json.total)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [filters, currentPage, textToFilter])

  useEffect(() => {
    setSearchParams(() => {
      const params = new URLSearchParams()
      if (textToFilter) params.set('text', textToFilter)
      if (filters.technology) params.set('technology', filters.technology)
      if (filters.location) params.set('type', filters.location)
      if (filters.experienceLevel) params.set('level', filters.experienceLevel)
      if (currentPage > 1) params.set('page', currentPage)
      return params
    })

  }, [filters, currentPage, textToFilter, setSearchParams])

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
  }

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
  }

  return {
    filters,
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter
  }
}

export default function SearchPage() {
  const {
    filters,
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter
  } = useFilters()

  return (
    <div className={styles.searchPage}>
      <SearchFormSection
        initialText={textToFilter}
        initialFilters={filters}
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
      />

      <section className={styles.searchResultsSection}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>
            {loading ? 'Buscando...' : `Resultados (${total})`}
          </h2>
          {!loading && <span className={styles.resultsCount}>Página {currentPage} de {totalPages || 1}</span>}
        </div>

        <div className={styles.grid}>
          {
            loading ? (
              <div className={styles.loadingWrapper}>
                <p>Cargando los mejores empleos para ti...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className={styles.emptyWrapper}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', opacity: 0.5 }}>
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M8 11h6" />
                </svg>
                <p>No se han encontrado empleos que coincidan con los criterios.</p>
                <button
                  onClick={() => { handleTextFilter(""); handleSearch({ technology: '', location: '', experienceLevel: '' }) }}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-light)', cursor: 'pointer', marginTop: '1rem', textDecoration: 'underline' }}
                >
                  Limpiar todos los filtros
                </button>
              </div>
            ) : (
              <JobListings jobs={jobs} />
            )
          }
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  )
}
