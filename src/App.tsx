import { useState } from 'react'
import './App.css'
import { HomePage } from './pages/home'
import { Header } from './components/headers'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Share } from './pages/share';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter basename='/remitano-fe'>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<PrivateRoute><Share /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function PrivateRoute({ children }: any) {
  const token = localStorage.getItem('token')
  return !!token ? children : <Navigate to="/" />;
}

export default App
