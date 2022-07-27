import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter basename={ process.env.PUBLIC_URL }>
          <Content />
        </BrowserRouter>
      </div>);
  }
}

export default App;
