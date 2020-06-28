const themeToggle = document.getElementById('themeToggle')
themeToggle.onchange = () => {
    document.documentElement.classList.toggle('dark-theme')
}