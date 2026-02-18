import { useRouter } from "../hooks/useRouter"
import styles from "./Home.module.css"

export default function HomePage() {
  const { navigateTo } = useRouter()

  const handleSearch = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchTerm = formData.get('search')

    const url = searchTerm
      ? `/search?text=${encodeURIComponent(searchTerm)}`
      : '/search'

    navigateTo(url)
  }

  return (
    <main>
      <section className={styles.hero}>
        <img src="./background.webp" className={styles.heroImage} />

        <h1 className={styles.heroTitle}>Encuentra el trabajo de tus sueños</h1>
        <p className={styles.heroSubtitle}>Únete a la comunidad más grande de desarrolladores y encuentra tu próxima oportunidad en las mejores tech companies.</p>

        <div className={styles.searchContainer}>
          <form className={styles.searchForm} role="search" onSubmit={handleSearch}>
            <svg className={styles.searchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>

            <input
              name="search"
              required
              type="search"
              className={styles.searchInput}
              placeholder="Puesto, tecnología o empresa..."
            />

            <button type="submit" className={styles.searchButton}>Buscar empleos</button>
          </form>
        </div>
      </section>

      <section className={styles.infoSection}>
        <header className={styles.infoLogo}>
          <h2 className={styles.infoTitle}>¿Por qué DevJobs?</h2>
          <p className={styles.infoDescription}>La plataforma preferida por desarrolladores e ingenieros para conectar con empresas que valoran el código de calidad.</p>
        </header>

        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg fill="none" height="32" viewBox="0 0 24 24" width="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Ofertas Curadas</h3>
            <p className={styles.featureText}>Solo las mejores empresas y proyectos que realmente te harán crecer profesionalmente.</p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg fill="none" height="32" viewBox="0 0 24 24" width="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Comunidad Tech</h3>
            <p className={styles.featureText}>Conecta con miles de desarrolladores que comparten sus experiencias y salarios reales.</p>
          </article>

          <article className={styles.featureCard}>
            <div className={styles.iconWrapper}>
              <svg fill="none" height="32" viewBox="0 0 24 24" width="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Transparencia Total</h3>
            <p className={styles.featureText}>Rango salarial y stack tecnológico visible en todas las ofertas. Sin sorpresas.</p>
          </article>
        </div>
      </section>
    </main>
  )
}
