import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Launch from './pages/Launch'
import Assessment from './pages/Assessment'
import Capital from './pages/Capital'
import Article from './pages/Article'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Launch />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/capital/:id" element={<Capital />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
