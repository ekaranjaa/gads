const overallProgress = {
    'progress': 100,
    'link': 'https://app.pluralsight.com/channels/details/eacce069-f072-4a04-bbbd-27e747f68ede'
}
const skills = [
    {
        'name': 'HTML',
        'marks': calculatePercentageScore(211),
        'link': 'https://app.pluralsight.com/score/skill-assessment/html5/summary?context=profile'
    },
    {
        'name': 'CSS',
        'marks': calculatePercentageScore(212),
        'link': 'https://app.pluralsight.com/score/skill-assessment/css/summary?context=profile'
    },
    {
        'name': 'JavaScript',
        'marks': calculatePercentageScore(197),
        'link': 'https://app.pluralsight.com/score/skill-assessment/javascript/summary?context=profile'
    }
]
const projects = []

const analyticsContainer = document.getElementById('analytics')
const projectsTab = document.querySelector('.projects')
const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary')

const analytics = `
    <div class="card">
        <div class="head">
            <a href="${overallProgress.link}" class="icon" target="_blank">
                <i class="fas fa-external-link-alt"></i>
            </a>
            <div class="chart" data-progress="${overallProgress.progress}" style="background: conic-gradient(${primaryColor} 0% ${overallProgress.progress}%, rgba(0, 0, 0, 0) ${overallProgress.progress}% 100%)"></div>
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
                <a href="${skill.link}" class="icon" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <div class="chart" data-progress="${skill.marks}%"  style="background: conic-gradient(${primaryColor} 0% ${skill.marks}%, rgba(0, 0, 0, 0) ${skill.marks}% 100%)"></div>
            </div>
            <div class="body">
                <h1>${skill.name}</h1>
            </div>
        </div>
    `
    analyticsContainer.innerHTML += card
}

function displayProjects() {
    if (projects.length > 0) {
        projectsTab.classList.remove('empty')

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];

            const card = `
                <div class="project">
                    <div class="project-name">
                        <a href="${project.link}" target="_blank">${project.name}</a>
                    </div>
                    <div class="progress">
                        <div class="progress-bar">
                            <div class="bar" style="width: ${project.progress}%"></div>
                        </div>
                        <span>${project.progress}%</span>
                    </div>
                </div>
            `

            projectsTab.innerHTML += card
        }
    } else {
        projectsTab.innerHTML = `
            <div class="emptyContent">
                <i class="fas fa-project-diagram"></i>
                <p>COMING SOON</p>
            </div>
        `
    }
}

function calculatePercentageScore(score) {
    const maxScore = 300
    const userScore = score
    const percentageScore = (userScore * 100) / maxScore

    return Math.round(percentageScore)
}

document.addEventListener('DOMContentLoaded', () => {
    incrementAnalytics(0, overallProgress.progress)

    skills.forEach((skill, index) => {
        incrementSkills(0, { 'index': index, 'marks': skill.marks })
    })

    window.setTimeout(() => {
        document.querySelector('.spinner').style.display = 'none'
        displayProjects()
    }, 3000)
})

function incrementAnalytics(start, end) {
    setTimeout(() => {
        start++
        if (start <= end) {
            document.querySelector(".card .head .chart").style.background = `conic-gradient(${primaryColor} 0% ${start}%, rgba(0, 0, 0, 0) ${start}% 100%)`
            document.querySelector(".card .head .chart").setAttribute('data-progress', `${start}%`)
            incrementAnalytics(start, end)
        }
    }, 10)
}

function incrementSkills(start, end) {
    setTimeout(() => {
        start++
        if (start <= end.marks) {
            const chart = document.querySelectorAll(".card-mini .head .chart")[end.index]

            chart.style.background = `conic-gradient(${primaryColor} 0% ${start}%, rgba(0, 0, 0, 0) ${start}% 100%)`
            chart.setAttribute('data-progress', `${start}%`)
            incrementSkills(start, end)
        }
    }, 10)
}
