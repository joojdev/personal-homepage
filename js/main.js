const searchForm = document.querySelector('#searchForm')
const searchInput = document.querySelector('#searchInput')
const clock = document.querySelector('#clock')
const appList = document.querySelector('#appList')

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()

  searchQuery = searchInput.value.trim()

  if (!searchQuery.length) return

  const googleUrl = `https://www.google.com/search?q=${encodeURI(searchQuery)}`
  location.href = googleUrl
})

function startClock() {
  const today = new Date()
  const hours = addZero(today.getHours())
  const minutes = addZero(today.getMinutes())
  const seconds = addZero(today.getSeconds())
  clock.textContent = `${hours}:${minutes}:${seconds}`
  setTimeout(startClock, 1000)
}

function addZero(number) {
  return number < 10 ? '0' + number : number
}

const appArray = [
  {
    logo: 'youtube.png',
    title: 'youtube',
    url: 'https://www.youtube.com/'
  },
  {
    logo: 'reddit.png',
    title: 'reddit',
    url: 'https://www.reddit.com/'
  },
  {
    logo: 'chatgpt.png',
    title: 'chatgpt',
    url: 'https://chat.openai.com/'
  },
  {
    logo: 'github.png',
    title: 'github',
    url: 'https://github.com/joojdev/'
  }
]

function loadApps() {
  appArray.forEach(({ logo, title, url }) => {
    const imageElement = document.createElement('img')
    imageElement.src = `./images/${logo}`
    imageElement.title = title
    imageElement.className = 'shortcut'

    imageElement.addEventListener('click', () => {
      location.href = url
    })

    appList.append(imageElement)
  })
}

const themeArray = [
  {
    backgroundImage: 'purple.webp',
    clockColor: 'rgb(226, 171, 226)'
  },
  {
    backgroundImage: 'green.webp',
    clockColor: 'rgb(189, 227, 151)'
  },
  {
    backgroundImage: 'pink.webp',
    clockColor: 'rgb(210, 42, 97)'
  }
]

function loadTheme(theme) {
  const root = document.querySelector(':root')
  root.style.setProperty('--background-image', `url('../images/${theme.backgroundImage}')`)
  root.style.setProperty('--clock-color', theme.clockColor)
}

function changeTheme() {
  if (!localStorage.getItem('currentTheme')) return localStorage.setItem('currentTheme', 0)

  const currentTheme = parseInt(localStorage.getItem('currentTheme'))
  switch(currentTheme) {
    case 0:
      localStorage.setItem('currentTheme', 1)
      loadTheme(themeArray[1])
      break
    case 1:
      localStorage.setItem('currentTheme', 2)
      loadTheme(themeArray[2])
      break
    case 2:
      localStorage.setItem('currentTheme', 0)
      loadTheme(themeArray[0])
      break
  }
}

function startEverything() {
  startClock()
  loadApps()
  changeTheme()
}

document.onload = startEverything()