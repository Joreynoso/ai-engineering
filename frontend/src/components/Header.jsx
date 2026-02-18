import { NavLink } from 'react-router'
import { Link } from './Link'
import { useAuthStore } from '../store/authStore'
import { useFavoritesStore } from '../store/favoritesStore'
import styles from './Header.module.css'

export function Header() {
  const { isLoggedIn } = useAuthStore()
  const { countFavorites } = useFavoritesStore()

  const numberOfFavorites = countFavorites()

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.logo}>
        <svg className={styles.logoIcon} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        <h1 className={styles.logoText}>DevJobs</h1>
      </Link>

      <div className={styles.userSection}>
        <nav className={styles.nav}>
          <NavLink
            className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
            to="/search"
          >
            Empleos
          </NavLink>
          {
            isLoggedIn && (
              <NavLink
                className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
                to="/profile"
              >
                Mis Favoritos <span style={{ opacity: 0.6, fontSize: '0.8em' }}>({numberOfFavorites})</span>
              </NavLink>
            )
          }
        </nav>

        <HeaderUserButton />
      </div>

    </header>
  )
}

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore()
  const { clearFavorites } = useFavoritesStore()

  const handleLogout = () => {
    logout()
    clearFavorites()
  }

  return isLoggedIn
    ? <button className={`${styles.authButton} ${styles.logoutButton}`} onClick={handleLogout}>Cerrar sesión</button>
    : <button className={styles.authButton} onClick={login}>Iniciar sesión</button>
}