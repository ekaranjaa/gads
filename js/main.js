const themeToggle = document.getElementById('themeToggle')

window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        themeToggle.click()
    }
}

themeToggle.onchange = () => {
    if (themeToggle.checked === false) {
        rememberTheme('default')
        document.documentElement.classList.remove('dark-theme')
        document.querySelector("meta[name=theme-color]").setAttribute("content", "#fff")
    } else {
        rememberTheme('dark')
        document.documentElement.classList.toggle('dark-theme')
        document.querySelector("meta[name=theme-color]").setAttribute("content", "#222")
    }
}

function rememberTheme(theme) {
    localStorage.setItem('theme', theme)
}

// Initiate time countdown
(() => {
    const countDown = document.querySelector(".countdown")
    const countDownDate = new Date("Jul 27, 2020 00:00:00").getTime()

    const x = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownDate - now

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (days <= 1) countDown.style.background = 'red'
        if (days > 1 && days < 5) countDown.style.background = 'orange'
        if (days >= 5) countDown.style.background = 'green'

        countDown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`

        if (distance < 0) {
            clearInterval(x)
            document.querySelector(".countdown").innerHTML = "Phase 1 Complete"
        }
    }, 1000)
})()

function openTab(e, tabId) {
    const tabs = document.querySelectorAll('.tab-content')
    const tabLinks = document.querySelectorAll('.nav-link')
    const tabActions = document.querySelectorAll('.nav-actions .btn')
    const forms = document.querySelectorAll("form")

    document.querySelector('.content').classList.remove('overlay')

    for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        form.classList.remove('active')
    }

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.classList.remove('active')
    }

    for (let i = 0; i < tabLinks.length; i++) {
        const tabLink = tabLinks[i];
        tabLink.classList.remove('active')
    }

    for (let i = 0; i < tabActions.length; i++) {
        const tabAction = tabActions[i];

        if (tabAction.getAttribute('data-action') === tabId) {
            tabAction.classList.add('active')
        } else {
            tabAction.classList.remove('active')
        }
    }

    persistTab(tabId)
    document.getElementById(tabId).classList.add('active')
    e.currentTarget.classList.add('active')
}

function persistTab(tabId) {
    sessionStorage.setItem('tabId', tabId)
}

// Get the last tab opened before page reload
(() => {
    const tabs = document.querySelectorAll('.tab-content')
    const tabLinks = document.querySelectorAll('.nav-link')
    const tabActions = document.querySelectorAll('.nav-actions .btn')
    let activeTab

    if (sessionStorage.getItem('tabId') !== null) {
        activeTab = sessionStorage.getItem('tabId')
    } else {
        activeTab = tabs[0].id
    }

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];

        if (tab.id === activeTab) {
            tab.classList.add('active')
        }
    }

    for (let i = 0; i < tabLinks.length; i++) {
        const tabLink = tabLinks[i];

        if (tabLink.getAttribute('name') === activeTab) {
            tabLink.classList.add('active')
        }
    }

    for (let i = 0; i < tabActions.length; i++) {
        const tabAction = tabActions[i];

        if (tabAction.getAttribute('data-action') === activeTab) {
            tabAction.classList.add('active')
        } else {
            tabAction.classList.remove('active')
        }
    }
})()

function openForm(formId) {
    const form = document.getElementById(formId)
    form.classList.toggle('active')
    form.firstElementChild.focus()
    document.querySelector('.content').classList.add('overlay')
}

function closeForm(formId) {
    document.getElementById(formId).classList.remove('active')
    document.querySelector('.content').classList.remove('overlay')
}

(() => {
    // Close the opened form when the user clicks outside the form
    const forms = document.querySelectorAll("form")
    window.onmouseup = (e) => {
        if (e.target.closest('form.active')) return
        forms.forEach(form => {
            if (form.classList.contains('active')) {
                form.classList.remove('active')
                document.querySelector('.content').classList.remove('overlay')
            }
        })
    }

    // Close the opened form when the user presses `Esc`
    document.body.onkeydown = (e) => {
        if (e.key === 'Escape') {
            forms.forEach(form => {
                if (form.classList.contains('active')) {
                    form.classList.remove('active')
                    document.querySelector('.content').classList.remove('overlay')
                }
            })
        }
    }
})()
