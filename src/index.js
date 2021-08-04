import './scss/index.scss'

import {WithoutRxJs} from "./WithoutRsJs";
import {withRxJs} from "./withRxJs";
import AppContainer from "./AppContainer";

const renderApp = () => {
    AppContainer("app", "Without RxJs")
    AppContainer("app2", "With RxJs")
    WithoutRxJs("app")
    withRxJs("app2")
}

renderApp()