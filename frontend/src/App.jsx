import './App.css'
import Posts from './components/posts'
import Forms from './components/Form'
import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <h1>Ract app</h1>
      <Routes>
        <Route path='/' element={<Posts/>} />
        <Route path='create/' element={<Forms/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
