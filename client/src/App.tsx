import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import ThemeProvider from './theme';
import { ColorModeProvider } from '@chakra-ui/react';
import Layout from './components/Layout';

function App() {


  return <div className={``}>
    <ColorModeProvider>
      <ThemeProvider>
        <Suspense>
          <Layout>
            <RouterProvider router={router} />
          </Layout>
        </Suspense>
      </ThemeProvider>
    </ColorModeProvider>
  </div>;
}

export default App;