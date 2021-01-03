import {
  BrowserRouter as Router, 
  Route,
  Switch,
} from "react-router-dom";

import LoginScreen from './components/LoginScreen.js'
import SignUpScreen from './components/SignUpScreen.js'
import Dashboard from './components/Dashboard.js'
import CreatePlaylist from './components/CreatePlaylist.js'
import Playlist from './components/Playlist.js'
import Video from './components/Video.js'
import NoMatch from './components/NoMatch.js'
import EditSong from "./components/EditSong.js";
import EditPlaylist from "./components/EditPlaylist.js";
import CreateSong from "./components/CreateSong.js";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginScreen}></Route>
          <Route path="/signup" component={SignUpScreen}></Route>
          <Route path="/dashboard" component={Dashboard} render={(props) => <Dashboard {...props} />}></Route>  
          <Route path="/create" component={CreatePlaylist}></Route>
          <Route path="/playlist/:id" children={<Playlist />}></Route>
          <Route path="/video/:id" children={<Video />}></Route>
          <Route path="/editPlaylist/:id" children={<EditPlaylist />}></Route>
          <Route path="/editSong/:id" children={<EditSong />}></Route>
          <Route component={NoMatch}></Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
