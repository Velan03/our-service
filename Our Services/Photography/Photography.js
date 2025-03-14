document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader")
    if (preloader) {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }
  })

  // Back to Top Button
  const backToTop = document.getElementById("backToTop")
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add("show")
      } else {
        backToTop.classList.remove("show")
      }
    })

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Gallery Filtering
  const filterButtons = document.querySelectorAll("#eventTabs .nav-link")
  const galleryItems = document.querySelectorAll(".gallery-item")

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()

        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        galleryItems.forEach((item) => {
          if (filter === "all") {
            item.style.display = "block"
          } else if (item.classList.contains(filter)) {
            item.style.display = "block"
          } else {
            item.style.display = "none"
          }
        })
      })
    })
  }

  // Search Functionality
  const searchInput = document.getElementById("searchEvent")
  if (searchInput && galleryItems.length) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()

      galleryItems.forEach((item) => {
        const title = item.querySelector(".card-title")?.textContent.toLowerCase() || ""
        const description = item.querySelector(".card-text")?.textContent.toLowerCase() || ""

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  }

  // Form Validation
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true
      const formInputs = contactForm.querySelectorAll("input, textarea, select")

      formInputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          input.classList.add("is-invalid")
          isValid = false
        } else {
          input.classList.remove("is-invalid")
        }

        // Email validation
        if (input.type === "email" && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(input.value.trim())) {
            input.classList.add("is-invalid")
            isValid = false
          }
        }
      })

      if (isValid) {
        // Show success message
        const formContainer = contactForm.parentElement
        formContainer.innerHTML = `
          <div class="text-center py-5">
            <i class="bi bi-check-circle-fill text-success" style="font-size: 5rem;"></i>
            <h3 class="mt-4">Thank You!</h3>
            <p class="lead">Your message has been sent successfully. We'll get back to you soon!</p>
          </div>
        `
      }
    })

    // Real-time validation
    const formInputs = contactForm.querySelectorAll("input, textarea, select")
    formInputs.forEach((input) => {
      input.addEventListener("blur", function () {
        if (this.hasAttribute("required") && !this.value.trim()) {
          this.classList.add("is-invalid")
        } else {
          this.classList.remove("is-invalid")
        }

        // Email validation
        if (this.type === "email" && this.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(this.value.trim())) {
            this.classList.add("is-invalid")
          }
        }
      })
    })
  }

  // Video Modal Handling
  const videoModals = document.querySelectorAll(".modal")
  videoModals.forEach((modal) => {
    modal.addEventListener("hidden.bs.modal", function () {
      const video = this.querySelector("video")
      if (video) {
        video.pause()
      }
    })
  })

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        })
      }
    })
  })

  // Photographer Animation
  const photographerElements = document.querySelectorAll(".photographer-element")

  photographerElements.forEach((element) => {
    element.addEventListener("click", function () {
      const flash = this.querySelector(".camera-flash")
      flash.style.animation = "none"

      // Trigger reflow
      void this.offsetWidth

      flash.style.animation = "flash 1.5s ease-out"
    })
  })

  // Queue animation for cards
  const cards = document.querySelectorAll(".card")
  const delay = 100

  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * delay}ms`

    // Add hover event for photographer animation
    card.addEventListener("mouseenter", function () {
      const photographer = this.querySelector(".card-photographer")
      if (photographer) {
        setTimeout(() => {
          const flash = photographer.querySelector(".camera-flash")
          if (flash) {
            flash.style.animation = "none"
            void flash.offsetWidth
            flash.style.animation = "flash 1.5s ease-out"
          }
        }, 300)
      }
    })
  })
})

