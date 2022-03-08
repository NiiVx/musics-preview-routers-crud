import React from 'react';

export default class Loading extends React.Component {
  render() {
    return (
      <div data-testid="page-loading">
        <p>Carregando...</p>
      </div>
    );
  }
}
