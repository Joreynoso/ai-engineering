import { useId, useState, useRef } from "react"
import styles from './SearchFormSection.module.css'

const useSearchForm = ({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter }) => {
  const timeoutId = useRef(null)
  const [searchText, setSearchText] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (event.target.name === idText) {
      return // ya lo manejamos en onChange
    }

    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel)
    }

    onSearch(filters)
  }

  const handleTextChange = (event) => {
    const text = event.target.value
    setSearchText(text) // actualizamos el input inmediatamente

    // Debounce: Cancelar el timeout anterior
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => {
      onTextFilter(text)
    }, 500)
  }

  return {
    searchText,
    handleSubmit,
    handleTextChange
  }
}

export function SearchFormSection({ initialFilters, onTextFilter, onSearch, initialText }) {
  const idText = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperienceLevel = useId()

  const inputRef = useRef()

  const {
    handleSubmit,
    handleTextChange
  } = useSearchForm({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter })

  const handleClearInput = (event) => {
    event.preventDefault()

    if (inputRef.current) {
      inputRef.current.value = ""
    }
    onTextFilter("")
  }

  return (
    <section className={styles.searchSection}>
      <h1 className={styles.title}>Encuentra tu próximo desafío</h1>
      <p className={styles.subtitle}>Explora miles de oportunidades en las empresas tecnológicas más innovadoras del mundo.</p>

      <form onChange={handleSubmit} className={styles.form} role="search">

        <div className={styles.searchBarWrapper}>
          <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>

          <input
            ref={inputRef}
            name={idText}
            className={styles.input}
            type="text"
            placeholder="Puesto, empresa o tecnología..."
            onChange={handleTextChange}
            defaultValue={initialText}
          />

          <button className={styles.clearButton} onClick={handleClearInput} aria-label="Limpiar búsqueda">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>

        <div className={styles.filtersGrid}>
          <select
            name={idTechnology}
            className={styles.select}
            defaultValue={initialFilters.technology}
            aria-label="Filtrar por Tecnología"
          >
            <option value="">Todas las Tecnologías</option>
            <optgroup label="Populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select
            name={idLocation}
            className={styles.select}
            defaultValue={initialFilters.location}
            aria-label="Filtrar por Ubicación"
          >
            <option value="">Todas las Ubicaciones</option>
            <option value="remoto">Remoto 🏠</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select
            name={idExperienceLevel}
            className={styles.select}
            defaultValue={initialFilters.experienceLevel}
            aria-label="Filtrar por Nivel"
          >
            <option value="">Cualquier Nivel</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead / Staff</option>
          </select>
        </div>
      </form>
    </section>
  )
}
