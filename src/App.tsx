import { Fragment } from 'react';
import { privateRoutes, publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import '~/assets/_globalStyle.scss';
import PrivateRoute from './routes/PrivateRoute';
import { IRoutes } from './shared/model/global';
import { useSelector } from 'react-redux';
import { RootState } from './services/redux/store';
import { useAppDispatch, useAppSelector } from './config/store';
import { getListBoards } from './pages/Board/board.reducer';
function App() {
   const token = useAppSelector((state) => state.tokenSlice.token);
   return (
      <Router>
         <div className="App">
            <Routes>
               {publicRoutes.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;
                  if (route.layout) {
                     Layout = route.layout;
                  } else if (route.layout === null) {
                     Layout = Fragment;
                  }

                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           <Layout>
                              <Page />
                           </Layout>
                        }
                     />
                  );
               })}
               {privateRoutes.map((route: IRoutes, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;

                  if (route.layout) {
                     Layout = route.layout;
                  } else if (route.layout === null) {
                     Layout = Fragment;
                  }

                  return (
                     <Route
                        key={index}
                        path={route.path}
                        element={
                           <PrivateRoute
                              isAuthenticated={true}
                              component={Layout}
                              children={<Page />}
                           />
                        }
                     />
                  );
               })}
            </Routes>
         </div>
      </Router>
   );
}

export default App;
