import { JobCard } from './JobCard.jsx'
import styles from '../pages/Search.module.css'

export function JobListings({ jobs }) {
  return (
    <div className={styles.grid}>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}