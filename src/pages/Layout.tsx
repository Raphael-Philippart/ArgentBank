import {Outlet} from "react-router-dom";
import {Provider} from "react-redux";
import Nav from "../components/uix/nav/Nav";
import Footer from "../components/uix/footer/Footer";
import store from './../store/index';

const Layout = () => {
  return <Provider store={store}>
    <main>
      <Nav/>
      <Outlet/>
      <Footer />
    </main>
  </Provider>
};

export default Layout;
