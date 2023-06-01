import { Fragment, useEffect } from 'react';
import { privateRoutes, publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import '~/assets/_globalStyle.scss';
import PrivateRoute from './routes/PrivateRoute';
import { IRoutes } from './shared/model/global';
import { useAppDispatch, useAppSelector } from './config/store';
import { currenUser } from './shared/reducers/user.reducer';
import ProtectedRoute from './components/ProtectedRoute/protectedRoute';
import axios from 'axios';
import { SERVER_API_URL } from './config/constants';
function App() {
   const dispatch = useAppDispatch();
   const currentUser = useAppSelector((state) => state.userSlice.user);
   const getCurrenUser = async () => {
      dispatch(currenUser());
   };
   useEffect(() => {
      getCurrenUser();
   }, []);
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
                           <ProtectedRoute user={currentUser.status} redirectPath="/login">
                              <Layout>
                                 <Page />
                              </Layout>
                           </ProtectedRoute>
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
