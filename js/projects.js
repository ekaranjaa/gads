const projects = [
  {
    name: 'Password generator',
    cover_image: 'passgen.png',
    source: 'https://github.com/ekaranjaa/password-generator',
    live: 'https://passgenn.netlify.app',
  },
  {
    name: '"Abacus" game',
    cover_image: 'abacus.png',
    source: 'https://github.com/ekaranjaa/abacus-game',
    live: 'https://intgame.netlify.app',
  },
  {
    name: 'Memory game',
    cover_image: 'iqgame.png',
    source: 'https://github.com/ekaranjaa/memory-game',
    live: 'https://iqgame.netlify.app',
  },
]

const projectsTab = document.querySelector('.projects')

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (projects.length > 0) {
      projectsTab.classList.remove('empty')

      projects.forEach(project => {
        const card = `
                    <div class="project">
                        <div class="head">
                            <img src="./images/${project.cover_image}" alt="${project.name}">
                        </div>
                        <div class="body">
                            <p class="name">${project.name}</p>
                            <div class="links">
                                <a href="${project.source}" target="_blank">
                                    <i class="fab fa-github"></i>
                                    <span>Source</span>
                                </a>
                                <a href="${project.live}" target="_blank">
                                    <i class="fas fa-external-link-alt"></i>
                                    <span>Live</span>
                                </a>
                            </div>
                        </div>
                    </div>
                `

        projectsTab.innerHTML += card
      })
    } else {
      projectsTab.innerHTML = `
                <div class="emptyContent">
                    <i class="fas fa-project-diagram"></i>
                    <p>You have no projects yet</p>
                </div>
            `
    }
  }, 3000)
})
