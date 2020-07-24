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
const courses = [
    {
        'name': 'HTML Fundamentals',
        'progress': 100,
        'link': 'https://app.pluralsight.com/library/courses/cf24be02-4875-4adb-a0dd-497e0235f47f'
    },
    {
        'name': 'Introduction to CSS for Designers',
        'progress': 100,
        'link': 'https://app.pluralsight.com/library/courses/cf24be02-4875-4adb-a0dd-497e0235f47f'
    },
    {
        'name': 'JavaScript Getting Started',
        'progress': 100,
        'link': 'https://app.pluralsight.com/library/courses/cf24be02-4875-4adb-a0dd-497e0235f47f'
    },
    {
        'name': 'Mobile First Responsive Design',
        'progress': 100,
        'link': 'https://app.pluralsight.com/library/courses/9358b960-8da3-4f12-a926-e166832d34a3'
    },
    {
        'name': 'Making a Web Form Accessible',
        'progress': 100,
        'link': 'https://app.pluralsight.com/library/courses/4dd99913-5d17-4c6b-9b14-99785e7861c8'
    },
    {
        'name': 'Git: The Big Picture',
        'progress': 100,
        'link': 'https://app.pluralsight.com/library/courses/git-big-picture/table-of-contents'
    }
]

const analyticsContainer = document.getElementById('analytics')
const coursesTab = document.querySelector('.courses')
const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary')

const analytics = `
    <div class="card">
        <div class="head">
            <a href="${overallProgress.link}" target="_blank">
                <i class="icon fas fa-external-link-alt"></i>
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
                <a href="${skill.link}" target="_blank">
                    <i class="icon fas fa-external-link-alt"></i>
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

function displayCourses() {
    console.log(courses.length)
    if (courses.length > 0) {
        coursesTab.classList.remove('empty')

        for (let i = 0; i < courses.length; i++) {
            const course = courses[i];

            const card = `
            <div class="course">
                <div class="course-name">
                    <a href="${course.link}" target="_blank">${course.name}</a>
                </div>
                <div class="progress">
                    <div class="progress-bar">
                        <div class="bar" style="width: ${course.progress}%"></div>,
                    </div>
                    <span>${course.progress}%</span>
                </div>
            </div>
        `

            coursesTab.innerHTML += card
        }
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

    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        incrementSkills(0, skill.marks)
    }

    window.setTimeout(() => {
        document.querySelector('.spinner').style.display = 'none'
        displayCourses()
    }, 3000)
})

function incrementAnalytics(from, to) {
    setTimeout(() => {
        from++
        if (from <= to) {
            document.querySelector(".card .head .chart").style.background = `conic-gradient(${primaryColor} 0% ${from}%, rgba(0, 0, 0, 0) ${from}% 100%)`
            document.querySelector(".card .head .chart").setAttribute('data-progress', `${from}%`)
            incrementAnalytics(from, to)
        }
    }, 10)
}

function incrementSkills(from, to) {
    setTimeout(() => {
        from++
        if (from <= to) {
            const charts = document.querySelectorAll(".card-mini .head .chart")

            charts.forEach(chart => {
                chart.style.background = `conic-gradient(${primaryColor} 0% ${from}%, rgba(0, 0, 0, 0) ${from}% 100%)`
                chart.setAttribute('data-progress', `${from}%`)
            })
            incrementSkills(from, to)
        }
    }, 10)
}
