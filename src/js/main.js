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

function openTab(evt, tabId) {
    const tabLinks = document.getElementsByClassName('tab-link')
    const tabActions = document.querySelectorAll('.tab-actions .btn')
    const tabs = document.getElementsByClassName('tab-content')

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

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.classList.remove('active')
    }

    document.getElementById(tabId).classList.add('active')
    evt.currentTarget.classList.add('active')
}

document.querySelector('.default').click()