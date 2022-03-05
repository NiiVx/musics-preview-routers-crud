import React from 'react';
import { Link } from 'react-router-dom';

class Album extends React.Component {
  render() {
    return (<Link to="/album/:id" data-testid="page-album"><div>Page Album</div></Link>);
  }
}

export default Album;
