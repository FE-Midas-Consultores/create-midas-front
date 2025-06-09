import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>{{ PROJECT_NAME }}</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}
