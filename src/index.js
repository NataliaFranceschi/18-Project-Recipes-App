import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './context/myProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <Provider>

      <App />

    </Provider>,
  );

// BrowserRouter>
//         <Switch>
//           <Route exact path="/" component={ Login } />
//           <Route exact path="/search" component={ Search } />
//           <Route exact path="/album/:id" component={ Album } />
//           <Route exact path="/favorites" component={ Favorites } />
//           <Route exact path="/profile" component={ Profile } />
//           <Route exact path="/profile/edit" component={ ProfileEdit } />
//           <Route component={ NotFound } />
//         </Switch>
//       </BrowserRouter>
