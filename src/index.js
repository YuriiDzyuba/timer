import './scss/index.scss'
import {WithoutRxJs} from "./WithoutRsJs";
import {withRxJs} from "./withRxJs";

const renderApp = () =>{
    WithoutRxJs("app")
    withRxJs("app2")
}

renderApp()