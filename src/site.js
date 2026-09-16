const toggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.site-nav')
const compact = window.matchMedia('(max-width: 860px)')
const root = document.documentElement

const trigger = document.querySelector('.nav-group__trigger')
const panel = trigger && document.getElementById(trigger.getAttribute('aria-controls'))

const header = document.querySelector('.site-header')

// The bar is sticky under a utility strip that scrolls away, so its bottom edge
// moves between two heights. Reading it as the panel opens is what keeps the
// panel against the bar in both states.
const setPanelOpen = (open) => {
  if (!trigger || !panel) return
  // The measurement comes before the first write, so opening the panel costs one
  // layout rather than one for every property read back after a style change.
  const edge = open && header ? Math.round(header.getBoundingClientRect().bottom) : null
  if (edge !== null) panel.style.top = `${edge}px`
  trigger.setAttribute('aria-expanded', String(open))
  panel.classList.toggle('is-open', open)
  // The panel's visibility is transitioned, so a closed panel stays visible, and
  // its links stay in the tab order, for the length of the fade. This takes them
  // out of reach on the click instead.
  panel.inert = !open
}

// The pickers open one at a time, so opening either one and anything that closes
// menus from the outside both need the set of what is currently open.
const openMenus = new Set()

const closeMenu = (picker, returnFocus) => {
  const menuTrigger = picker.querySelector('.picker__trigger')
  const menu = picker.querySelector('.picker__menu')
  menuTrigger.setAttribute('aria-expanded', 'false')
  menu.hidden = true
  openMenus.delete(picker)
  if (returnFocus) menuTrigger.focus()
}

// Tab stops in document order, minus the ones a closed panel or a hidden menu has
// taken out of the layout. The active element is kept even when it measures as
// hidden, so focus already inside a collapsing container still has a place in the
// list.
const focusablesIn = (element) =>
  [...element.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(
    (node) => node.offsetParent !== null || node === document.activeElement
  )

if (toggle && nav) {
  let restoreFocusTo = null

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open)
    toggle.classList.toggle('is-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    document.body.style.overflow = open && compact.matches ? 'hidden' : ''
    if (!open) setPanelOpen(false)
  }

  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open')
    restoreFocusTo = open ? toggle : null
    setOpen(open)
    if (open) focusablesIn(nav)[0]?.focus()
  })

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false)
  })

  // Full-screen and over the page, the panel owns the tab ring: without this,
  // Tab walks out of it into content the reader cannot see.
  nav.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !compact.matches || !nav.classList.contains('is-open')) return
    const stops = focusablesIn(nav)
    if (!stops.length) return
    const edge = event.shiftKey ? stops[0] : stops[stops.length - 1]
    if (document.activeElement !== edge) return
    event.preventDefault()
    ;(event.shiftKey ? stops[stops.length - 1] : stops[0]).focus()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return
    if (panel && trigger && trigger.getAttribute('aria-expanded') === 'true') {
      setPanelOpen(false)
      trigger.focus()
      return
    }
    if (nav.classList.contains('is-open')) {
      setOpen(false)
      ;(restoreFocusTo || toggle).focus()
      restoreFocusTo = null
    }
  })

  // Widening past the breakpoint returns the nav to the header row, which leaves
  // the open state and the scroll lock behind if nothing clears them.
  const syncToViewport = () => {
    if (!compact.matches && nav.classList.contains('is-open')) setOpen(false)
  }
  compact.addEventListener('change', syncToViewport)
  window.addEventListener('resize', syncToViewport)
}

if (trigger && panel) {
  trigger.addEventListener('click', () => {
    openMenus.forEach((picker) => closeMenu(picker, false))
    setPanelOpen(trigger.getAttribute('aria-expanded') !== 'true')
  })

  panel.addEventListener('click', (event) => {
    if (event.target.closest('a')) setPanelOpen(false)
  })

  document.addEventListener('click', (event) => {
    if (compact.matches) return
    if (trigger.getAttribute('aria-expanded') !== 'true') return
    if (event.target.closest('.mega-panel') || event.target.closest('.nav-group')) return
    setPanelOpen(false)
  })
}

// One class toggle carries the bar into its floating state and back, fired by a
// sentinel sitting at the threshold rather than by reading scroll on every frame.
if (header) {
  const sentinel = document.createElement('div')
  sentinel.className = 'scroll-sentinel'
  sentinel.setAttribute('aria-hidden', 'true')
  document.body.prepend(sentinel)
  new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('is-floating', !entry.isIntersecting)
      setPanelOpen(false)
    },
    { threshold: 0 }
  ).observe(sentinel)
}

const here = location.pathname.replace(/index\.html$/, '')
document.querySelectorAll('.site-nav a, .site-footer a, .mega-link').forEach((link) => {
  if (link.getAttribute('href') === here) link.setAttribute('aria-current', 'page')
})

// The firm's own year rather than the reader's: east of Texas the two differ
// for the last hours of December, and the line this fills names the firm.
const thisYear = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Chicago',
  year: 'numeric',
}).format(new Date())
document.querySelectorAll('[data-year]').forEach((slot) => {
  slot.textContent = thisYear
})

// The browser chrome takes its colour from the same token the page paints with,
// so a theme swap never leaves the two disagreeing.
const paintChrome = () => {
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', getComputedStyle(document.body).backgroundColor)
}
paintChrome()

const remember = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    // A browser refusing storage still gets the change for this page view.
  }
}

const readStored = (key) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

document.querySelectorAll('.picker').forEach((picker) => {
  const menuTrigger = picker.querySelector('.picker__trigger')
  const menu = picker.querySelector('.picker__menu')
  if (!menuTrigger || !menu) return
  const items = [...menu.querySelectorAll('button')]

  const openMenu = (focusIndex) => {
    openMenus.forEach((other) => other !== picker && closeMenu(other, false))
    setPanelOpen(false)
    menuTrigger.setAttribute('aria-expanded', 'true')
    menu.hidden = false
    openMenus.add(picker)
    const checked = items.findIndex((item) => item.getAttribute('aria-checked') === 'true')
    items[focusIndex === 'last' ? items.length - 1 : focusIndex === 'checked' ? Math.max(checked, 0) : 0]?.focus()
  }

  menuTrigger.addEventListener('click', () => {
    if (menuTrigger.getAttribute('aria-expanded') === 'true') closeMenu(picker, false)
    else openMenu('checked')
  })

  menuTrigger.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openMenu('checked')
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      openMenu('last')
    }
  })

  menu.addEventListener('keydown', (event) => {
    const at = items.indexOf(document.activeElement)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      items[(at + 1) % items.length].focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      items[(at - 1 + items.length) % items.length].focus()
    } else if (event.key === 'Home') {
      event.preventDefault()
      items[0].focus()
    } else if (event.key === 'End') {
      event.preventDefault()
      items[items.length - 1].focus()
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      closeMenu(picker, event.key === 'Escape')
    }
  })
})

document.addEventListener('click', (event) => {
  openMenus.forEach((picker) => {
    if (!picker.contains(event.target)) closeMenu(picker, false)
  })
})

const markChoice = (buttons, matches) => {
  buttons.forEach((button) => button.setAttribute('aria-checked', String(matches(button))))
}

const systemDark = window.matchMedia('(prefers-color-scheme: dark)')

const applyTheme = (choice) => {
  root.setAttribute('data-theme-choice', choice)
  root.setAttribute('data-theme', choice === 'system' ? (systemDark.matches ? 'dark' : 'light') : choice)
  paintChrome()
}

// The trigger reads out the theme it is currently on, so the control says what
// state it is in rather than only what it opens.
const nameTheme = () => {
  const chosen = document.querySelector('[data-theme-option][aria-checked="true"]')
  const slot = document.querySelector('[data-theme-name]')
  if (chosen && slot) slot.textContent = chosen.textContent.trim()
}

const themeButtons = [...document.querySelectorAll('[data-theme-option]')]
markChoice(themeButtons, (button) => button.dataset.themeOption === (readStored('delux-theme') || 'dark'))
themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const choice = button.dataset.themeOption
    remember('delux-theme', choice)
    applyTheme(choice)
    markChoice(themeButtons, (other) => other === button)
    nameThemeTrigger()
    closeMenu(button.closest('.picker'), true)
  })
})

// Following the system means following it as it changes, not only at load.
systemDark.addEventListener('change', () => {
  if (root.getAttribute('data-theme-choice') === 'system') applyTheme('system')
})

// The page is served in English and carries its Spanish as a lookup from the
// English string. Translating means walking the text the page already holds, so
// nothing is fetched and no phrase is stored twice.
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'CODE'])
const tidy = (text) => text.replace(/\s+/g, ' ').trim()

let dictionary = null
let englishSnapshot = null
let englishTitle = null

const readDictionary = () => {
  if (dictionary) return dictionary
  const slot = document.getElementById('i18n-es')
  try {
    dictionary = slot ? JSON.parse(slot.textContent) : {}
  } catch {
    dictionary = {}
  }
  return dictionary
}

const textNodes = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (SKIP_TAGS.has(node.parentNode.nodeName)) return NodeFilter.FILTER_REJECT
      return tidy(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })
  const found = []
  let node = walker.nextNode()
  while (node) {
    found.push(node)
    node = walker.nextNode()
  }
  return found
}

const LABELLED = ['aria-label', 'alt', 'title']

const applyLanguage = (language) => {
  const words = readDictionary()
  const nodes = textNodes()
  const labelled = [...document.querySelectorAll('[aria-label], img[alt], [title]')]

  if (!englishSnapshot) {
    englishSnapshot = {
      text: nodes.map((node) => node.nodeValue),
      labels: labelled.map((element) => LABELLED.map((name) => element.getAttribute(name))),
    }
  }

  nodes.forEach((node, index) => {
    const english = englishSnapshot.text[index] ?? null
    if (english === null) return
    const spanish = language === 'es' ? (words[tidy(english)] ?? null) : null
    if (spanish === null) {
      node.nodeValue = english
      return
    }
    node.nodeValue = `${english.match(/^\s*/)[0]}${spanish}${english.match(/\s*$/)[0]}`
  })

  labelled.forEach((element, index) => {
    LABELLED.forEach((name, slot) => {
      const english = englishSnapshot.labels[index]?.[slot] ?? null
      if (english === null) return
      const spanish = language === 'es' ? (words[tidy(english)] ?? null) : null
      element.setAttribute(name, spanish === null ? english : spanish)
    })
  })

  englishTitle = englishTitle || document.title
  document.title = (language === 'es' && words[tidy(englishTitle)]) || englishTitle
  root.lang = language
}

const langButtons = [...document.querySelectorAll('[data-lang]')]
const storedLang = readStored('delux-lang') === 'es' ? 'es' : 'en'
const langValue = document.querySelector('[data-picker="lang"] [data-picker-value]')

const showLanguage = (language) => {
  applyLanguage(language)
  markChoice(langButtons, (button) => button.dataset.lang === language)
  if (langValue) langValue.textContent = language.toUpperCase()
}

const nameThemeTrigger = () => {
  const button = document.querySelector('[data-picker="theme"] .picker__trigger')
  const chosen = document.querySelector('[data-theme-option][aria-checked="true"]')
  if (button && chosen) button.setAttribute('aria-label', `${button.dataset.pickerLabel}: ${chosen.textContent.trim()}`)
  nameTheme()
}

showLanguage(storedLang)

langButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const language = button.dataset.lang
    remember('delux-lang', language)
    showLanguage(language)
    closeMenu(button.closest('.picker'), true)
  })
})

nameThemeTrigger()

const clickLayer = document.createElement('div')
clickLayer.className = 'click-layer'
clickLayer.setAttribute('aria-hidden', 'true')
document.body.appendChild(clickLayer)

const still = window.matchMedia('(prefers-reduced-motion: reduce)')
document.addEventListener('pointerdown', (event) => {
  if (still.matches || event.button !== 0) return
  const ripple = document.createElement('span')
  ripple.className = 'click-ripple'
  ripple.style.left = `${event.clientX}px`
  ripple.style.top = `${event.clientY}px`
  clickLayer.appendChild(ripple)
  ripple.addEventListener('animationend', () => ripple.remove())
})

// A photograph arrives over the placeholder fill rather than replacing it in a
// single repaint. The hidden state and the handler are set in the same pass, so
// a script that never runs leaves every image visible.
document.querySelectorAll('.plate__frame img, .logo-plate img').forEach((image) => {
  const reveal = () => image.classList.add('is-decoded')
  if (image.complete) {
    reveal()
    return
  }
  image.classList.add('is-arriving')
  image.addEventListener('load', reveal, { once: true })
  image.addEventListener('error', reveal, { once: true })
})
