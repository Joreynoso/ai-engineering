import { useState } from "react"
import { Link } from "./Link"
import styles from './JobCard.module.css'
import { useFavoritesStore } from "../store/favoritesStore"
import { useAuthStore } from "../store/authStore"

function JobCardFavoriteButton({ jobId }) {
  const { isLoggedIn } = useAuthStore()
  const { toggleFavorite, isFavorite } = useFavoritesStore()
  const favorite = isFavorite(jobId)

  return (
    <button
      disabled={!isLoggedIn}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(jobId)
      }}
      className={`${styles.favoriteButton} ${favorite ? styles.favoriteButtonActive : ''}`}
      aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
  )
}

function JobCardApplyButton({ jobId }) {
  const [isApplied, setIsApplied] = useState(false)
  const { isLoggedIn } = useAuthStore()

  const handleApplyClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsApplied(true)
  }

  return (
    <button
      disabled={!isLoggedIn || isApplied}
      className={`${styles.applyButton} ${isApplied ? styles.applied : ''}`}
      onClick={handleApplyClick}
    >
      {isApplied ? 'Aplicado' : 'Aplicar'}
    </button>
  )
}

export function JobCard({ job }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.content}>
          <Link className={styles.titleLink} href={`/jobs/${job.id}`}>
            <h3 className={styles.title}>{job.titulo}</h3>
          </Link>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14"></path><path d="M9 21V11h6v10"></path></svg>
              {job.empresa}
            </div>
            <span>•</span>
            <div className={styles.infoItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              {job.ubicacion}
            </div>
          </div>
        </div>
      </div>

      <p className={styles.description}>{job.descripcion}</p>

      <div className={styles.footer}>
        <div className={styles.mainActions}>
          <Link href={`/jobs/${job.id}`} className={styles.detailsLink}>
            Ver detalles
          </Link>
          <JobCardApplyButton jobId={job.id} />
        </div>
        <JobCardFavoriteButton jobId={job.id} />
      </div>
    </article>
  )
}
