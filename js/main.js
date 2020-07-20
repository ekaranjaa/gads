const themeToggle = document.getElementById('themeToggle')

window.onload = () => {
    if (localStorage.getItem('theme') === 'dark') {
        themeToggle.click()
    }
}

themeToggle.onchange = () => {
    if (themeToggle.checked === false) {
        localStorage.setItem('theme', 'default')
        document.documentElement.classList.remove('dark-theme')
        document.querySelector("meta[name=theme-color]").setAttribute("content", "#fff")
    } else {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.toggle('dark-theme')
        document.querySelector("meta[name=theme-color]").setAttribute("content", "#333")
    }
}

// Initiate countdown
(() => {
    let countDownDate = new Date("Jul 21, 2020 10:00:00").getTime()

    let x = setInterval(() => {
        let now = new Date().getTime()
        let distance = countDownDate - now

        let days = Math.floor(distance / (1000 * 60 * 60 * 24))
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((distance % (1000 * 60)) / 1000)

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
    e.target.classList.add('active')
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
        }
    }
})()
