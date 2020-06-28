const progress = 27
const skills = [
    { 'name': 'HTML5', 'mark': 85 },
    { 'name': 'CSS3', 'mark': 85 },
    { 'name': 'JavaScript', 'mark': 79 }
]
const analyticsContainer = document.getElementById('analytics')
const chartAccentColor = getComputedStyle(document.body).getPropertyValue('--chart-accent-color')

const analytics = `
    <div class="card">
        <div class="head">
            <div class="chart" data-progress="${progress}%" style="background: conic-gradient(${chartAccentColor} 0% ${progress}%, rgba(0, 0, 0, 0) ${progress}% 100%)"></div>
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
                <div class="chart" data-progress="${skill.mark}%"  style="background: conic-gradient(${chartAccentColor} 0% ${skill.mark}%, rgba(0, 0, 0, 0) ${skill.mark}% 100%)"></div>
            </div>
            <div class="body">
                <h1>${skill.name}</h1>
            </div>
        </div>
    `
    analyticsContainer.innerHTML += card
}