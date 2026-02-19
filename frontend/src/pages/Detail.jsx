import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { Link } from "../components/Link"
import snarkdown from 'snarkdown'
import styles from './Detail.module.css'
import { useAuthStore } from "../store/authStore"
import { useFavoritesStore } from "../store/favoritesStore"
import { useAiSummary } from '../hooks/useAiSummary'

const API_URL = import.meta.env.VITE_API_URL

function JobSection({ title, content }) {
  const html = snarkdown(content)

  return (
    <section className={styles.card}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  )
}

function DetailPageBreadCrumb({ jobTitle }) {
  return (
    <nav className={styles.breadcrumb}>
      <Link href="/search" className={styles.breadcrumbButton}>Empleos</Link>
      <span className={styles.breadcrumbSeparator}>/</span>
      <span className={styles.breadcrumbCurrent}>{jobTitle}</span>
    </nav>
  )
}

function DetailPageHeader({ job }) {
  return (
    <header className={`${styles.card} ${styles.headerCard}`}>
      <h1 className={styles.title}>{job.titulo}</h1>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"></path><path d="M9 21V11h6v10"></path></svg>
          {job.empresa}
        </div>
        <span>•</span>
        <div className={styles.metaItem}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          {job.ubicacion}
        </div>
      </div>
    </header>
  )
}

function DetailApplyButton() {
  const { isLoggedIn } = useAuthStore()

  return (
    <button disabled={!isLoggedIn} className={styles.applyButton}>
      {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
    </button>
  )
}

function DetailFavoriteButton({ jobId }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const favorite = isFavorite(jobId)

  return (
    <button
      onClick={() => toggleFavorite(jobId)}
      className={`${styles.favoriteButton} ${favorite ? styles.favoriteButtonActive : ''}`}
      aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      {favorite ? 'En favoritos' : 'Añadir a favoritos'}
    </button>
  )
}

function AISummary({jobId}) {
    const { summary, loading, error, generateSummary} = useAiSummary(jobId)

    // render return
    return (
      <div className={`${styles.card} ${styles.aiCard}`}>
        <div className={styles.aiTitle}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
          AI Magic Summary
        </div>

        {summary ? (
          <p className={styles.aiContent}>{summary}</p>
        ) : (
          <>
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>¿No tienes tiempo? Deja que nuestra IA resuma los puntos clave para ti.</p>
            <button
              onClick={generateSummary}
              disabled={loading}
              className={styles.aiButton}
            >
              {loading ? 'Analizando oferta...' : 'Generar Resumen AI'}
            </button>
          </>
        )}
        {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>{error}</p>}
      </div>
    )
  }

  export default function JobDetail() {
    const { jobId } = useParams()
    const navigate = useNavigate()
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      fetch(`${API_URL}/jobs/${jobId}`)
        .then(res => res.ok ? res.json() : navigate('/not-found'))
        .then(json => setJob(json))
        .finally(() => setLoading(false))
    }, [jobId, navigate])

    if (loading) return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Preparando detalles de la oferta...</p>
        </div>
      </div>
    )

    if (!job) return null

    return (
      <div className={styles.container}>
        <DetailPageBreadCrumb jobTitle={job.titulo} />

        <div className={styles.layout}>
          <main className={styles.mainContent}>
            <DetailPageHeader job={job} />
            <JobSection title="Acerca de la oferta" content={job.content.description} />
            <JobSection title="Responsabilidades" content={job.content.responsibilities} />
            <JobSection title="Requisitos clave" content={job.content.requirements} />
            <JobSection title="Sobre la empresa" content={job.content.about} />
          </main>

          <aside className={styles.sidebar}>
            <div className={`${styles.card} ${styles.actionsCard}`}>
              <DetailApplyButton />
              <DetailFavoriteButton jobId={job.id} />
            </div>

            <AISummary jobId={job.id} />
          </aside>
        </div>
      </div>
    )
  }
