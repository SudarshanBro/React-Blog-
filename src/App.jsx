import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/blog/Home";

import AddBlog from "./pages/blog/AddBlog";

import { Provider } from "react-redux";
import store from "../store/store";
import Protected from "./components/higherOrderComponent/Protected";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Spinner from "./pages/blog/components/spinner/Spinner";
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const EditBlog = lazy(() => import("./pages/blog/EditBlog"));
const SingleBlog = lazy(() => import("./pages/blog/SingleBlog"));

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary fallback={<h1>Something went wrong.....</h1>}>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/blog/add"
                element={
                  <Protected>
                    <AddBlog />
                  </Protected>
                }
              />
              <Route
                path="/blog/edit/:id"
                element={
                  <Protected>
                    <EditBlog />
                  </Protected>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <Protected>
                    <SingleBlog />
                  </Protected>
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
