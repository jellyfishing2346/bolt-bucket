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
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: 16 }}>
        <h1>DIY Delight — Customizer</h1>
        <nav>
          <button onClick={() => navigate('list')}>All Items</button>
          <button onClick={() => navigate('create')}>Create Item</button>
        </nav>
      </header>

      <main>
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
