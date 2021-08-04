
export const WithoutRxJs = (selector)=>{

    const display = document.querySelector(`#${selector}-display`)
    const startStopButton = document.querySelector(`#${selector}-startStop`)
    const resetButton = document.querySelector(`#${selector}-reset`)
    const doubleClickButton = document.querySelector(`#${selector}-wait`)

    let hours = 0,
        min = 0,
        sec = 0,
        timeout = 1000,
        isTimerActive = false,
        firstClick = 0,
        doubleClickLength = 299

    const getTime = () => {
        if (sec < 60) {
            return `${hours < 10 ? '0' + hours : hours}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
        } else if (sec === 60) {
            if (min === 59) {
                hours = hours + 1
                min = sec = 0
                if (hours === 24) {
                    hours = min = sec = 0
                    return getTime()
                }
                return getTime()
            }
            min = min + 1
            sec = 0
            return getTime()
        }
    }

    const timer = observer => {
        setInterval(() => {
            observer(1)
        }, timeout)
    }

    const timerDisplay = val => {
        if (isTimerActive){
            sec=sec+val
        }
        display.textContent = getTime()
    }

    const doubleClickListener = () => {
        let currentDate = Date.now()
        if (!firstClick) {
            firstClick = currentDate
        } else {
            if (currentDate - firstClick <= doubleClickLength) {
                isTimerActive = false
                firstClick = 0
            } else {
                firstClick = currentDate
            }
        }
    }

    timer(timerDisplay)

    startStopButton.addEventListener('click', () => {
        if (isTimerActive) {
            hours = min = sec = 0
            display.textContent = getTime()
            isTimerActive = false
        } else isTimerActive = true

    })

    resetButton.addEventListener('click', () => {
        if (hours || min || sec) {
            hours = min = sec = 0
            display.textContent = getTime()
            isTimerActive = true
        }
    })

    doubleClickButton.addEventListener('click', doubleClickListener)

}

