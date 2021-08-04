import {Observable} from 'rxjs'

export const withRxJs = (selector) =>{
    const display = document.querySelector(`#${selector}-display`)
    const startStopButton = document.querySelector(`#${selector}-startStop`)
    const resetButton = document.querySelector(`#${selector}-reset`)
    const doubleClickButton = document.querySelector(`#${selector}-wait`)

    let hours = 0,
        min = 0,
        sec = 0,
        timeout = 1000,
        isSubscribe = null,
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

    const timer = new Observable(subscriber => {
        setInterval(() => {
            subscriber.next(1)
        }, timeout);
    })

    const doubleClickListener = () => {
        let currentDate = Date.now()
        if (!firstClick) {
            firstClick = currentDate
        } else {
            if (currentDate - firstClick <= doubleClickLength) {
                isSubscribe.unsubscribe()
                isSubscribe = null
                firstClick = 0
            } else {
                firstClick = currentDate
            }
        }
    }

    const showNulls = () => {
        isSubscribe.unsubscribe()
        hours = min = sec = 0
        isSubscribe = null
        display.textContent = getTime()
    }

    const action = (callId) => {
        switch (callId) {
            case 'startStop':
                if (!isSubscribe) {
                    isSubscribe = timer.subscribe(val => {
                        sec = sec + val
                        display.textContent = getTime()
                    })
                } else {
                    showNulls()
                }
                break
            case 'reset':
                if (isSubscribe) {
                    showNulls()
                    action('startStop')
                }
                break
            default:
                break

        }

    }

    startStopButton.addEventListener('click', () => {
        action('startStop')
    })
    resetButton.addEventListener('click', () => {
        action('reset')
    })
    doubleClickButton.addEventListener('click', doubleClickListener)

}

