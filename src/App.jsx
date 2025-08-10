import { useState, useRef } from 'react'
import './App.css'

// Cargar todas las imágenes 
const imageModules = import.meta.glob('./images/*', { eager: true, as: 'url' })
const filenameToUrl = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [path.split('/').pop(), url])
)


function App() {
  const [activeSection, setActiveSection] = useState('menu')
  const menuSectionRef = useRef(null)

  //Redes sociales
  const socialLinks = {
    facebook: '',
    instagram: '',
    twitter: ''
  }

  // Correo del negocio 
  const businessEmail = 'zabdieljavier324@gmail.com'

  const handleScrollToMenu = () => {
    setActiveSection('menu')
    // Espera al siguiente ciclo para que la sección exista en el DOM
    setTimeout(() => {
      menuSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  const handleSubmitContact = (event) => {
    event.preventDefault()
    if (!businessEmail) {
      alert('Configura el correo del negocio en businessEmail para poder enviar el mensaje.')
      return
    }
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') || ''
    const email = formData.get('email') || ''
    const message = formData.get('message') || ''

    const subject = encodeURIComponent(`Mensaje de ${name || 'Cliente'}`)
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)
    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`
  }

  const tacos = [
    {
      id: 1,
      name: 'Taco de Carne Asada',
      description: 'Tortilla de maíz con carne asada, cebolla, cilantro y salsa',
      price: '$2.50',
      image: 'tacos_asada.jpg'
    },
    {
      id: 2,
      name: 'Taco de Pollo',
      description: 'Tortilla de maíz con pollo a la plancha, lechuga, tomate y crema',
      price: '$2.00',
      image: 'taco_pollo.png'
    },
    {
      id: 3,
      name: 'Taco de Pastor',
      description: 'Tortilla de maíz con carne de cerdo marinada, piña y cilantro',
      price: '$2.75',
      image: 'Tacos_pastor.jpg'
    },
    {
      id: 4,
      name: 'Taco de Pescado',
      description: 'Tortilla de maíz con pescado fresco, col y salsa chipotle',
      price: '$3.00',
      image: 'taco_pescado.png'
    },
    {
      id: 5,
      name: 'Gringa',
      description: 'Tortilla de harina con asados y queso',
      price: '$40',
      image: 'gringa.png'
    },
    {
      id: 6,
      name: 'Taco de Chorizo',
      description: 'Tortilla de maíz con chorizo, papas y cebolla',
      price: '$2.50',
      image: 'taco_chorizo.png'
    }
  ]

  return (
    <div className="app theme-inverted">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            {(() => {
              const logoCandidates = ['logo.png']
              const siteLogoUrl = logoCandidates.map((name) => filenameToUrl[name]).find(Boolean)
              return siteLogoUrl ? (
                <img src={siteLogoUrl} alt="Taco Escondido" className="site-logo" />
              ) : (
            <span className="logo-icon">🌮</span>
              )
            })()}
            <h1>Taco Escondido</h1>
          </div>
          <nav className="nav">
            <button 
              className={`nav-btn ${activeSection === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveSection('menu')}
            >
              Menú
            </button>
            <button 
              className={`nav-btn ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => setActiveSection('about')}
            >
              Nosotros
            </button>
            <button 
              className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveSection('contact')}
            >
              Contacto
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Los Mejores Tacos del 5 de Mayo</h2>
          <p>Sabor auténtico mexicano en cada bocado</p>
          <button className="cta-button" onClick={handleScrollToMenu}>Ver Menú</button>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {activeSection === 'menu' && (
          <section className="menu-section" ref={menuSectionRef} id="menu">
            <h2>Nuestro Menú</h2>
            <div className="menu-grid">
              {tacos.map((taco) => (
                <div key={taco.id} className="taco-card">
                  <div className="taco-image">
                    {filenameToUrl[taco.image] ? (
                      <img
                        src={filenameToUrl[taco.image]}
                        alt={taco.name}
                        className="taco-photo"
                      />
                    ) : (
                      taco.image || '🌮'
                    )}
                  </div>
                  <div className="taco-info">
                    <h3>{taco.name}</h3>
                    <p>{taco.description}</p>
                    <div className="taco-price">{taco.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="about-section">
            <h2>Sobre Nosotros</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  En Taco Escondido, nos apasiona la autenticidad de la cocina mexicana. 
                  Cada taco que preparamos está hecho con ingredientes frescos y recetas 
                  tradicionales que han pasado de generación en generación.
                </p>
                <p>
                  Nuestro compromiso es ofrecer la mejor experiencia gastronómica, 
                  combinando sabores tradicionales con un toque moderno que hace 
                  que cada visita sea memorable.
                </p>
              </div>
              <div className="about-features">
                <div className="feature">
                  <span className="feature-icon">🌽</span>
                  <h3>Ingredientes Frescos</h3>
                  <p>Utilizamos solo los mejores ingredientes locales</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🔥</span>
                  <h3>Hecho al Momento</h3>
                  <p>Preparamos tus tacos al instante para máximo sabor</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🚚</span>
                  <h3>Entrega Rápida</h3>
                  <p>Llevamos tu pedido en tiempo récord</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="contact-section">
            <h2>Contáctanos</h2>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <h3>Dirección</h3>
                    <p>5 de mayo(ejemplo)</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <h3>Teléfono</h3>
                    <p>(555) 333 2345</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <h3>Email</h3>
                    <p>{businessEmail || '@tacoescondido.com'}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🕒</span>
                  <div>
                    <h3>Horarios</h3>
                    <p>Lun-Dom: 11:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
              <form className="contact-form" onSubmit={handleSubmitContact}>
                <h3>Envíanos un Mensaje</h3>
                <input name="name" type="text" placeholder="Nombre" required />
                <input name="email" type="email" placeholder="Tu Email" required />
                <textarea name="message" placeholder="Mensaje" required></textarea>
                <button type="submit" className="submit-btn">Enviar Mensaje</button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Taco Escondido</h3>
            <p>Sabor auténtico mexicano</p>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.405.595 24 1.325 24h11.495v-9.294H9.691V11.09h3.129V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.59l-.467 3.616h-3.123V24h6.116C23.405 24 24 23.405 24 22.676V1.325C24 .595 23.405 0 22.675 0z" />
                </svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.92 4.92 0 0 1 1.78 1.153 4.92 4.92 0 0 1 1.153 1.78c.163.457.347 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.92 4.92 0 0 1-1.153 1.78 4.92 4.92 0 0 1-1.78 1.153c-.457.163-1.257.347-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.92 4.92 0 0 1-1.78-1.153 4.92 4.92 0 0 1-1.153-1.78c-.163-.457-.347-1.257-.403-2.427C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427a4.92 4.92 0 0 1 1.153-1.78 4.92 4.92 0 0 1 1.78-1.153c.457-.163 1.257-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0 1.684c-3.162 0-3.532.012-4.783.069-1.027.047-1.584.218-1.953.363-.492.19-.844.416-1.213.785-.369.369-.595.721-.785 1.213-.145.369-.316.926-.363 1.953-.057 1.251-.069 1.621-.069 4.783s.012 3.532.069 4.783c.047 1.027.218 1.584.363 1.953.19.492.416.844.785 1.213.369.369.721.595 1.213.785.369.145.926.316 1.953.363 1.251.057 1.621.069 4.783.069s3.532-.012 4.783-.069c1.027-.047 1.584-.218 1.953-.363.492-.19.844-.416 1.213-.785.369-.369.595-.721.785-1.213.145-.369.316-.926.363-1.953.057-1.251.069-1.621.069-4.783s-.012-3.532-.069-4.783c-.047-1.027-.218-1.584-.363-1.953-.19-.492-.416-.844-.785-1.213a3.237 3.237 0 0 0-1.213-.785c-.369-.145-.926-.316-1.953-.363-1.251-.057-1.621-.069-4.783-.069zm0 3.905a5.248 5.248 0 1 1 0 10.496 5.248 5.248 0 0 1 0-10.496zm0 1.684a3.564 3.564 0 1 0 0 7.128 3.564 3.564 0 0 0 0-7.128zm5.406-2.597a1.224 1.224 0 1 1 0 2.448 1.224 1.224 0 0 1 0-2.448z" />
                </svg>
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" title="Twitter">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.608 1.794-1.571 2.163-2.723-.949.564-2.003.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.723 0-4.93 2.207-4.93 4.93 0 .386.045.762.127 1.124-4.094-.205-7.725-2.165-10.159-5.144-.424.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.376 4.6 3.416-1.68 1.316-3.809 2.102-6.102 2.102-.39 0-.779-.023-1.17-.067 2.189 1.404 4.768 2.223 7.557 2.223 9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.423-.016-.637.962-.695 1.8-1.562 2.46-2.549z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Horarios</h4>
            <p>Lun-Dom: 11:00 AM - 10:00 PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Taco Escondido. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
