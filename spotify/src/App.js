import React, { Component } from "react";
import Main from "./components/MainComponent";
import "./App.css";
import "./components/SignUp/SignUp.css";
import "./components/AccountOverview/AccountOverviewComponent.css";
import "./components/SignIn/SignInComponent.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import {saveState,loadState} from './components/localstorage';

const persistState= loadState();
const store = ConfigureStore(persistState);
store.subscribe(()=>{
  saveState(store.getState());
})
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
