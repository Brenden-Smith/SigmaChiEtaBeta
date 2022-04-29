import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Admin from './pages/admin'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import { DataContext } from './context'

export default function App () {
  const [data, setData] = useState<any>()

  // Listen for changes on database
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'site/index'),
      (snap) => {
        if (snap.exists()) setData(snap.data())
      }
    )
    return () => unsub()
  }, [])

  // Render website
  return data && (
    <DataContext.Provider value={{ ...data }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  )
}
