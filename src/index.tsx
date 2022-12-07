import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


import App from './App';

import { store } from './redux/store';

const rootElemnet = document.getElementById('root');


if(rootElemnet){
    const root = ReactDOM.createRoot(rootElemnet);
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
    );

}
