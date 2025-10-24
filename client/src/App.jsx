import React, { useState } from 'react'
import CreateItem from './pages/CreateItem'
import ItemList from './pages/ItemList'
import ItemDetail from './pages/ItemDetail'
import EditItem from './pages/EditItem'

export default function App() {
  const [route, setRoute] = useState({ name: 'list', params: {} })

  function navigate(name, params = {}) {
    setRoute({ name, params })
  }

  return (
    <div className="min-h-screen text-white">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Bolt Bucket <span className="text-lg">🏍️</span></h1>
        </div>

        <div className="flex gap-3">
          <button className="btn-brand px-4 py-2 rounded-md">CUSTOMIZE</button>
          <button className="btn-brand px-4 py-2 rounded-md">VIEW CARS</button>
        </div>
      </header>

      <main className="px-6 pb-10">
        {route.name === 'list' && <ItemList onNavigate={navigate} />}
        {route.name === 'create' && <CreateItem onNavigate={navigate} />}
        {route.name === 'detail' && (
          <ItemDetail id={route.params.id} onNavigate={navigate} />
        )}
        {route.name === 'edit' && (
          <EditItem id={route.params.id} onNavigate={navigate} />
        )}
      </main>
    </div>
  )
}
