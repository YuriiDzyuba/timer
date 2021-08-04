const AppContainer = (selector, header) => {
    const div = document.querySelector(`#${selector}`)

    div.innerHTML=`
        <h4>${header}</h4>
        <div class="timer"
             id="timer"
        >
            <div class="timer__display" id="${selector}-display">
                00:00:00
            </div>
        </div>
        <div class="buttons">
            <div class="buttons__block">
                <button class="buttons__btnStart btn btn-success"
                        id="${selector}-startStop"
                        type="button"
                >
                    Start/Stop
                </button>
                <button class="buttons__btnStop btn btn-warning "
                        id="${selector}-wait"
                        type="button"
                >
                    Wait
                </button>
                <button class="buttons__btnReset btn btn-danger"
                        id="${selector}-reset"
                        type="button"
                >
                    Reset
                </button>
            </div>
        </div>
   
       `
};

export default AppContainer;