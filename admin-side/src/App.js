import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Products from './pages/products/Products';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Menu from './components/menu/Menu';
import './styles/global.scss';
import Company from './pages/company/Company';
import Product from './pages/product/Product';
import Login from './pages/login/Login'; // Import the Login component
import Logout from './components/logout/Logout'; // Import the Logout component
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { menu } from './data';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  // Check authentication on initial render
  useEffect(() => {
    AuthChecker();
  }, []);

  const AuthChecker = () => {
    console.log('Inside useEffect of isLoggedIn');
    const token = localStorage.getItem("currentUserToken");
    console.log(token);
    const isLoginPage = window.location.pathname === "/login";

    if (token !== null) {
      setIsLoggedIn(true);
      console.log("logged in");
    } else {
      setIsLoggedIn(false);
      if (!isLoginPage) {
        // Use window.location.href instead of useNavigate
        window.location.href = "/login";
        console.log("not logged in");
      }
    }
  };

  // Define updateActivePage function at the top level of the App component
  const updateActivePage = (pageTitle) => {
    setActivePage(pageTitle);
  };

  // Inside the Layout component
  const Layout = () => {
    const location = useLocation(); // Move useLocation here

    useEffect(() => {
      console.log('Inside useEffect of Layout');
      const currentPath = location.pathname;
      const pageTitle = menu
        .flatMap((section) => section.listItems)
        .find((listItem) => listItem.url === currentPath)?.title;

      if (pageTitle) {
        setActivePage(pageTitle);
      }
    }, [location]);

    // Create a map of URL paths to their corresponding components
    const componentMap = {
      '/': Dashboard,
      '/dashboard': Dashboard,
      '/users': Users,
      '/products': Products,
      '/company': Company,
      '/products/:id': Product,
      '/logout': Logout,
    };

    return (
      <div className="main">
        <Navbar updateActivePage={updateActivePage} /> {/* Pass the updateActivePage function as a prop */}
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              {/* Use the map function to generate the other routes dynamically */}
              <Routes>
                {menu.map((section) =>
                  section.listItems.map((listItem) => {
                    const Component = componentMap[listItem.url]; // Get the component from the componentMap
                    return (
                      <Route
                        key={listItem.id}
                        path={listItem.url}
                        element={
                          <div>
                            {/* Use Helmet to update the title dynamically */}
                            <Helmet>
                              <title>House of J | {activePage}</title>
                            </Helmet>
                            <Component />
                          </div>
                        } // Render the component using JSX along with Helmet
                      />
                    );
                  })
                )}
              </Routes>
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <Router>
      <HelmetProvider>
        {isLoggedIn ? (
          <Layout />
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <div>
                  {/* Use Helmet to update the title dynamically */}
                  <Helmet>
                    <title>House of J | Login</title>
                  </Helmet>
                  <Login />
                </div>
              }
            />
          </Routes>
        )}
      </HelmetProvider>
    </Router>
  );
}

export default App;
