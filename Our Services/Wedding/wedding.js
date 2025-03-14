document.addEventListener("DOMContentLoaded", () => {
    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle")
    if (themeToggle) {
      const body = document.body
      const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      const savedTheme = localStorage.getItem("theme")
  
      // Set initial theme
      if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme)) {
        body.classList.add("dark")
        const icon = themeToggle.querySelector("i")
        if (icon) {
          icon.classList.replace("bi-moon-fill", "bi-sun-fill")
        }
      }
  
      // Toggle theme on click
      themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark")
        const icon = themeToggle.querySelector("i")
  
        if (body.classList.contains("dark")) {
          localStorage.setItem("theme", "dark")
          if (icon) {
            icon.classList.replace("bi-moon-fill", "bi-sun-fill")
          }
        } else {
          localStorage.setItem("theme", "light")
          if (icon) {
            icon.classList.replace("bi-sun-fill", "bi-moon-fill")
          }
        }
      })
    }
  
    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled")
          navbar.style.padding = "10px 0"
        } else {
          navbar.classList.remove("scrolled")
          navbar.style.padding = "15px 0"
        }
      })
    }
  
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0
          const targetPosition = targetElement.offsetTop - navbarHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
  
          // Close mobile menu if open
          const navbarCollapse = document.querySelector(".navbar-collapse")
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            document.querySelector(".navbar-toggler")?.click()
          }
  
          // Update active nav link
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active")
          })
          this.classList.add("active")
        }
      })
    })
  
    // Event Queue Management
    const eventForm = document.getElementById("eventForm")
    const eventQueue = document.getElementById("eventQueue")
  
    if (eventForm && eventQueue) {
      // Sample events
      const sampleEvents = [
        { name: "Meena & Ravi", type: "Wedding", date: "2023-12-15", location: "Chennai" },
        { name: "Anitha & Suresh", type: "Engagement", date: "2023-12-20", location: "Coimbatore" },
        { name: "Priya & Karthik", type: "Reception", date: "2023-12-28", location: "Madurai" },
      ]
  
      // Get events from localStorage or use sample events
      const events = JSON.parse(localStorage.getItem("events")) || sampleEvents
  
      // Display events function
      function displayEvents() {
        // Sort events by date
        events.sort((a, b) => new Date(a.date) - new Date(b.date))
  
        // Clear event queue
        eventQueue.innerHTML = ""
  
        if (events.length === 0) {
          const noEvents = document.createElement("li")
          noEvents.className = "list-group-item"
          noEvents.textContent = "No upcoming events scheduled."
          eventQueue.appendChild(noEvents)
          return
        }
  
        // Add events to queue
        events.forEach((event, index) => {
          const eventDate = new Date(event.date)
          const formattedDate = eventDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
  
          const eventItem = document.createElement("li")
          eventItem.className = "list-group-item d-flex justify-content-between align-items-center"
  
          const eventContent = document.createElement("div")
  
          const eventTitle = document.createElement("h5")
          eventTitle.textContent = event.name
          eventContent.appendChild(eventTitle)
  
          const eventDetails = document.createElement("p")
          eventDetails.className = "mb-0"
          eventDetails.textContent = `${event.type} | ${formattedDate} | ${event.location}`
          eventContent.appendChild(eventDetails)
  
          eventItem.appendChild(eventContent)
  
          const deleteBtn = document.createElement("button")
          deleteBtn.className = "btn btn-sm btn-danger"
          deleteBtn.innerHTML = '<i class="bi bi-trash"></i>'
          deleteBtn.addEventListener("click", () => {
            events.splice(index, 1)
            localStorage.setItem("events", JSON.stringify(events))
            displayEvents()
          })
  
          eventItem.appendChild(deleteBtn)
          eventQueue.appendChild(eventItem)
        })
      }
  
      // Initial display of events
      displayEvents()
  
      // Event form submission
      eventForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Validate form
        if (!validateForm(this)) return
  
        // Create new event object
        const newEvent = {
          name: document.getElementById("eventName").value,
          type: document.getElementById("eventType").value,
          date: document.getElementById("eventDate").value,
          location: document.getElementById("eventLocation").value,
        }
  
        // Add to events array
        events.push(newEvent)
        localStorage.setItem("events", JSON.stringify(events))
  
        // Reset form and display updated events
        this.reset()
        displayEvents()
  
        // Show success message
        showAlert("Your event request has been submitted successfully!", "success")
      })
    }
  
    // Form validation helper
    function validateForm(form) {
      let isValid = true
      const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.classList.add("is-invalid")
          isValid = false
        } else {
          input.classList.remove("is-invalid")
  
          // Email validation
          if (input.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(input.value.trim())) {
              input.classList.add("is-invalid")
              isValid = false
            }
          }
        }
      })
  
      return isValid
    }
  
    // Show alert helper
    function showAlert(message, type = "info") {
      // Create alert element
      const alertDiv = document.createElement("div")
      alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4`
      alertDiv.style.zIndex = "9999"
      alertDiv.innerHTML = `
              ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          `
  
      // Add to document
      document.body.appendChild(alertDiv)
  
      // Auto remove after 5 seconds
      setTimeout(() => {
        alertDiv.classList.remove("show")
        setTimeout(() => alertDiv.remove(), 300)
      }, 5000)
    }
  
    // Contact form handling
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        if (validateForm(this)) {
          showAlert("Thank you for your message! We will get back to you soon.", "success")
          this.reset()
        }
      })
    }
  
    // Newsletter form handling
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        if (validateForm(this)) {
          showAlert("Thank you for subscribing to our newsletter!", "success")
          this.reset()
        }
      })
    }
  })
  
  