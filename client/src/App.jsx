import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Faculty from './pages/Faculty';
import Department from './pages/Department';
import Level from './pages/Level';
import Semester from './pages/Semester';
import Course from './pages/Course';
import PastQuestion from './pages/PastQuestion';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/faculty/:facultySlug" element={<Faculty />} />
        <Route path="/department/:departmentSlug" element={<Department />} />
        <Route path="/level/:departmentSlug/:level" element={<Level />} />
        <Route path="/semester/:departmentSlug/:level/:semester" element={<Semester />} />
        <Route path="/course/:courseSlug" element={<Course />} />
        <Route path="/past-question/:questionId" element={<PastQuestion />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}