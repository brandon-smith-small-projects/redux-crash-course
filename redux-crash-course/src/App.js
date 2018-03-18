import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Posts from './components/Posts'
import PostsForm from './components/PostsForm'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppBar position="static" style={{ backgroundColor: '#1565c0'}}>
            <Toolbar>
              <Typography 
                align="center" 
                variant="title" 
                color="inherit" 
                component='h1'
                className="header-title"
              >
                Redux Crash Course
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="App">
            <PostsForm/>
            <Posts/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
