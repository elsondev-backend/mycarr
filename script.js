// Menu do celular
const menuButton = document.querySelector('.menu-toggle')
const menu = document.getElementById('menu')

menuButton?.addEventListener('click', () => {
    const open = menu.classList.toggle('open')
    menuButton.setAttribute('aria-expanded', open)
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu')
})

// Carrossel da Home
const container = document.querySelector('.container')

if (container) {
    const prevButton = document.getElementById('prev')
    const nextButton = document.getElementById('next')
    const list = container.querySelector('.list')
    const items = container.querySelectorAll('.list .item')
    const indicator = container.querySelector('.indicator')
    const dots = indicator.querySelectorAll('ul .line')
    const numberElement = indicator.querySelector('.number')

    let active = 0
    const lastPosition = items.length - 1

    function setSlider(newActive, direction) {
        if (newActive === active) return
        list.style.setProperty('--calculation', direction)

        items[active].classList.remove('active')
        items[active].setAttribute('aria-hidden', 'true')
        dots[active].classList.remove('active')

        active = newActive

        items[active].classList.add('active')
        items[active].removeAttribute('aria-hidden')
        dots[active].classList.add('active')
        // padStart coloca o "0" na frente dos números menores que 10
        numberElement.innerText = String(active + 1).padStart(2, '0')
    }

    const next = () => setSlider(active + 1 > lastPosition ? 0 : active + 1, 1)
    const prev = () => setSlider(active - 1 < 0 ? lastPosition : active - 1, -1)

    nextButton.addEventListener('click', next)
    prevButton.addEventListener('click', prev)

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setSlider(index, index > active ? 1 : -1))
    })

    // Setas do teclado
    document.addEventListener('keydown', (event) => {
        if (document.querySelector('dialog[open]')) return
        if (event.key === 'ArrowRight') next()
        if (event.key === 'ArrowLeft') prev()
    })

    // Deslizar o dedo no celular
    let touchStartX = null
    container.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX
    }, { passive: true })
    container.addEventListener('touchend', (event) => {
        if (touchStartX === null) return
        const distance = event.changedTouches[0].clientX - touchStartX
        if (Math.abs(distance) > 50) distance < 0 ? next() : prev()
        touchStartX = null
    })
}

// Botão "Saiba Mais" abre a ficha técnica
document.querySelectorAll('[data-ficha]').forEach((button) => {
    button.addEventListener('click', () => {
        document.getElementById(button.dataset.ficha)?.showModal()
    })
})

// Fecha a ficha ao clicar fora dela
document.querySelectorAll('dialog.ficha').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
        const box = dialog.getBoundingClientRect()
        const outside = event.clientX < box.left || event.clientX > box.right ||
            event.clientY < box.top || event.clientY > box.bottom
        if (event.target === dialog && outside) dialog.close()
    })
})

// Formulário de contato (demonstração, sem envio real)
const contactForm = document.getElementById('contact-form')

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault()
    contactForm.querySelector('.form-status').hidden = false
    contactForm.reset()
})
