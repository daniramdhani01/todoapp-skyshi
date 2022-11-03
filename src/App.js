import { Routes, Route, BrowserRouter, Navigate, } from 'react-router-dom'
import Detail from './page/Detail';
import LandingPage from './page/LandingPage/index';

function App() {

  return (
    <div className='font-poppins min-h-screen bg-new-grey'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='item-list/:id' element={<Detail />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
