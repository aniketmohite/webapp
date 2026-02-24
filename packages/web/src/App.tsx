import { greeting } from '@webapp/shared';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>{greeting('World')}</h1>
      <p>Built with React + Vite in a pnpm monorepo.</p>
    </div>
  );
}

export default App;
