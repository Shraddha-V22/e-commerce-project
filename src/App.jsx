import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Products from "./pages/Products";
import Mockman from "mockman-js";
import ProductProvider from "./contexts/ProductProvider";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./contexts/CartProvider";
import WishlistProvider from "./contexts/WishlistProvider";
import AuthProvider from "./contexts/AuthProvider";
import Profile from "./pages/Profile";
import RequiredAuth from "./components/RequiredAuth";
import Checkout from "./pages/Checkout";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/checkout"
            element={
              <RequiredAuth>
                <Checkout />
              </RequiredAuth>
            }
          />
        </Route>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppRouter />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  );
}

export default App;
