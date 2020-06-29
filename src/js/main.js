const themeToggle = document.getElementById('themeToggle')

themeToggle.onchange = () => {
    if (themeToggle.checked === false) {
        document.documentElement.classList.remove('dark-theme')
        document.querySelector("meta[name=theme-color]").setAttribute("content", "#fff")
    } else {
        document.documentElement.classList.toggle('dark-theme')
        document.querySelector("meta[name=theme-color]").setAttribute("content", "#333")
    }
}

function openTab(evt, tabId) {
    const tabLinks = document.getElementsByClassName('tab-link')
    const tabs = document.getElementsByClassName('tab-content')

    for (let i = 0; i < tabLinks.length; i++) {
        const tabLink = tabLinks[i];
        tabLink.classList.remove('active')
    }

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.classList.remove('active')
    }

    document.getElementById(tabId).classList.add('active')
    evt.currentTarget.classList.add('active')
}

document.querySelector('.default').click()