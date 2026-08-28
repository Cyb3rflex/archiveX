import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
