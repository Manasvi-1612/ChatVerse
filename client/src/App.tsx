import { PropsWithChildren, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ToggleColorMode } from './components/ToggleColorMode';

function App({ children }: PropsWithChildren) {
  return <div className={``}>
    <Suspense>
      <ToggleColorMode />
      <RouterProvider router={router} />
    </Suspense>
  </div>;
}

export default App;