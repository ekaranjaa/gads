const overallProgress = {
    'progress': 34,
    'link': 'https://app.pluralsight.com/channels/details/eacce069-f072-4a04-bbbd-27e747f68ede'
}
const skills = [
    {
        'name': 'HTML5',
        'marks': 85,
        'link': 'https://app.pluralsight.com/score/skill-assessment/html5/summary?context=profile'
    },
    {
        'name': 'CSS',
        'marks': 85,
        'link': 'https://app.pluralsight.com/score/skill-assessment/css/summary?context=profile'
    },
    {
        'name': 'JavaScript',
        'marks': 79,
        'link': 'https://app.pluralsight.com/score/skill-assessment/javascript/summary?context=profile'
    }
]
const courses = [
    {
        'name': 'HTML Fundamentals',
        'progress': 13,
        'link': 'https://app.pluralsight.com/library/courses/cf24be02-4875-4adb-a0dd-497e0235f47f'
    },
    {
        'name': 'Making a Web Form Accessible',
        'progress': 64,
        'link': 'https://app.pluralsight.com/library/courses/4dd99913-5d17-4c6b-9b14-99785e7861c8'
    },
    {
        'name': 'Mobile First Responsive Design',
        'progress': 49,
        'link': 'https://app.pluralsight.com/library/courses/9358b960-8da3-4f12-a926-e166832d34a3'
    },
    {
        'name': 'JavaScript: Getting Started',
        'progress': 29,
        'link': 'https://app.pluralsight.com/library/courses/804837c6-ac3c-4698-aebd-bc15f629e64e'
    },
    {
        'name': 'Building a JavaScript Development Environment',
        'progress': 58,
        'link': 'https://app.pluralsight.com/library/courses/1c9c8ed1-a332-4437-92da-a0972a7bccd3'
    },
    {
        'name': 'Progressive Web App Fundamentals',
        'progress': 1,
        'link': 'https://app.pluralsight.com/library/courses/7adc2582-8e0b-4ff9-b4a6-073767de12d2'
    }
]

const analyticsContainer = document.getElementById('analytics')
const coursesContainer = document.getElementById('courses')

const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary')

const analytics = `
    <div class="card">
        <div class="head">
            <a href="${overallProgress.link}" target="_blank">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="25px" height="25px">
                        <path d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"/>
                    </svg>
                </span>
            </a>
            <div class="chart" data-progress="${overallProgress.progress}%" style="background: conic-gradient(${primaryColor} 0% ${overallProgress.progress}%, rgba(0, 0, 0, 0) ${overallProgress.progress}% 100%)"></div>
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
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="25px" height="25px">
                            <path d="M 25.980469 2.9902344 A 1.0001 1.0001 0 0 0 25.869141 3 L 20 3 A 1.0001 1.0001 0 1 0 20 5 L 23.585938 5 L 13.292969 15.292969 A 1.0001 1.0001 0 1 0 14.707031 16.707031 L 25 6.4140625 L 25 10 A 1.0001 1.0001 0 1 0 27 10 L 27 4.1269531 A 1.0001 1.0001 0 0 0 25.980469 2.9902344 z M 6 7 C 4.9069372 7 4 7.9069372 4 9 L 4 24 C 4 25.093063 4.9069372 26 6 26 L 21 26 C 22.093063 26 23 25.093063 23 24 L 23 14 L 23 11.421875 L 21 13.421875 L 21 16 L 21 24 L 6 24 L 6 9 L 14 9 L 16 9 L 16.578125 9 L 18.578125 7 L 16 7 L 14 7 L 6 7 z"/>
                        </svg>
                    </span>
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

for (let i = 0; i < courses.length; i++) {
    const course = courses[i];

    const card = `
        <div class="course">
            <div class="course-name">
                <a href="${course.link}" target="_blank">${course.name}</a>
            </div>
            <div class="progress">
                <div class="progress-bar">
                    <div class="bar" style="width: ${course.progress}%"></div>
                </div>
                <span>${course.progress}%</span>
            </div>
        </div>
    `

    coursesContainer.innerHTML += card
}