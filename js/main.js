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
        document.querySelector("meta[name=theme-color]").setAttribute("content", "#333")
    }
}

function rememberTheme(theme) {
    localStorage.setItem('theme', theme)
}

// Initiate countdown
(() => {
    const countDownDate = new Date("Jul 21, 2020 10:00:00").getTime()

    const x = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownDate - now

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`

        if (distance < 0) {
            clearInterval(x)
            document.getElementById("countdown").innerHTML = "TIME UP"
        }
    }, 1000)
})()

function openTab(e, tabId) {
    const tabs = document.querySelectorAll('.tab-content')
    const tabLinks = document.querySelectorAll('.tab-link')
    const tabActions = document.querySelectorAll('.tab-actions .btn')

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
    const tabLinks = document.querySelectorAll('.tab-link')
    const tabActions = document.querySelectorAll('.tab-actions .btn')
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

function toggleForm(formId) {
    document.getElementById(formId).classList.toggle('active')
    document.querySelector('.content').classList.toggle('overlay')
}

function closeForm(formId) {
    document.getElementById(formId).classList.toggle('active')
    document.querySelector('.content').classList.toggle('overlay')
}
