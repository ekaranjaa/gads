const progress = 27
const skills = [
    { 'name': 'HTML5', 'mark': 85 },
    { 'name': 'CSS3', 'mark': 85 },
    { 'name': 'JavaScript', 'mark': 79 }
]
const analyticsContainer = document.getElementById('analytics')
const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary')
const themeToggle = document.getElementById('themeToggle')

const analytics = `
    <div class="card">
        <div class="head">
            <div class="chart" data-progress="${progress}%" style="background: conic-gradient(${primaryColor} 0% ${progress}%, rgba(0, 0, 0, 0) ${progress}% 100%)"></div>
        </div>
        <div class="body">
            <h1>Completed</h1>
        </div>
    </div>
`
analyticsContainer.innerHTML = analytics

for (let i = 0; i < skills.length; i++) {
    const skill = skills[i]

    const card = `
        <div class="card-mini">
            <div class="head">
                <div class="chart" data-progress="${skill.mark}%"  style="background: conic-gradient(${primaryColor} 0% ${skill.mark}%, rgba(0, 0, 0, 0) ${skill.mark}% 100%)"></div>
            </div>
            <div class="body">
                <h1>${skill.name}</h1>
            </div>
        </div>
    `
    analyticsContainer.innerHTML += card
}

themeToggle.onchange = () => {
    document.documentElement.classList.toggle('dark-theme')
    document.querySelector("meta[name=theme-color]").setAttribute("content", "#333");
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