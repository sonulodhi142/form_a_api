import './App.css'
import Posts from './components/posts'
import Form from './components/Form'
import {BrowserRouter, Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <h1>Ract app</h1>
      <Routes>
        <Route path='/' element={<Posts/>} />
        <Route path='create/' element={<Form/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
