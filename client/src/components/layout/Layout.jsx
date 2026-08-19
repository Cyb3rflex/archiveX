import Navbar from '../navigation/Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <main className="flex-1 pt-16" id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
