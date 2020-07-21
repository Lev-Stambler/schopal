import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';

import SearchPage from './pages/search-pages/search';
import ResultsPage from './pages/search-pages/search-result';
import InfoPage from './pages/info-page/info';

export const App = () => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.css file.
   */
  return (
    <div className="app">
      <main>
        <Router>
          <Switch>
            <Route path="/" exact component={SearchPage} />
            <Route path="/results/" component={ResultsPage} />
            <Route path="/info" component={InfoPage} />
          </Switch>
        </Router>
      </main>
      <div className="footer">
        <div className="feedback-form">
          <a href="https://forms.gle/gCkYrsvmBRGRbJKc9">Leave feedback</a>
        </div>
        <div className="contact">Please contact me through
            <a href="mailto:levst@google.com">my email</a>
        </div>
      </div>
    </div>
  );
};

export default App;
