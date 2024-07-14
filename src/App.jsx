import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Components/Header.jsx';
import ActivityView from './Layout/ActivityView.jsx';

const App = () => {
  return (
    <div className='container'>
      {/* <Header/> */}
      <ActivityView />
      {/* <div className="container-view">Some activities should be here</div> */}
    </div>
  );
};

// ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
