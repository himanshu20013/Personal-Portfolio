// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Animated counter for stats
function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const timer = setInterval(() => {
    current += increment
    element.textContent = Math.floor(current)
    if (current >= target) {
      element.textContent = target
      clearInterval(timer)
    }
  }, 20)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Animate stats counters
      if (entry.target.classList.contains("stat-number")) {
        const target = Number.parseInt(entry.target.getAttribute("data-target"))
        animateCounter(entry.target, target)
      }

      // Animate skill bars
      if (entry.target.classList.contains("skill-progress")) {
        const width = entry.target.getAttribute("data-width")
        setTimeout(() => {
          entry.target.style.width = width + "%"
        }, 200)
      }

      // Add fade-in animation
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll(
    ".stat-number, .skill-progress, .project-card, .timeline-content, .contact-item",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Observe skill progress bars
  document.querySelectorAll(".skill-progress").forEach((el) => {
    observer.observe(el)
  })

  // Observe stat numbers
  document.querySelectorAll(".stat-number").forEach((el) => {
    observer.observe(el)
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-shapes .shape")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// 3D tilt effect for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)"
  })
})

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I'll get back to you soon.")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroName = document.querySelector(".title-name")
  if (heroName) {
    const originalText = heroName.textContent
    setTimeout(() => {
      typeWriter(heroName, originalText, 150)
    }, 1000)
  }
})

// Add scroll progress indicator
const scrollProgress = document.createElement("div")
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    z-index: 9999;
    transition: width 0.1s ease;
`
document.body.appendChild(scrollProgress)

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.offsetHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.style.width = scrollPercent + "%"
})

// Add floating particles effect
function createParticle() {
  const particle = document.createElement("div")
  particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(102, 126, 234, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: particleFloat 4s linear forwards;
    `

  particle.style.left = Math.random() * window.innerWidth + "px"
  particle.style.top = window.innerHeight + "px"

  document.body.appendChild(particle)

  setTimeout(() => {
    particle.remove()
  }, 4000)
}

// Add particle animation CSS
const particleStyle = document.createElement("style")
particleStyle.textContent = `
    @keyframes particleFloat {
        to {
            transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(particleStyle)

// Create particles periodically
setInterval(createParticle, 300)
