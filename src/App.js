import React from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Use HashRouter
import { MyContextProvider } from "./components/context";
import Home from './pages/home';
import Header from './components/header';
import Footer from "./components/footer";
import NoPage from "./components/no-page";
import About from "./pages/about";
import Services from "./pages/services";
import ProjectDetailPage from "./components/project-detail-page";
import ContactUs from "./pages/contact-us";
import InHouseCustomDesign from "./pages/inhouse-custom-design";    
import Faqs from "./pages/faqs";
import Blogs from "./pages/blogs";
import ServiceDetailPage from "./components/service-detail-page";
import BlogDetailPage from "./components/blog-detail-page";
import ServerDashboard from './pages/server-dashboard';
import DashboardLogin from './pages/dashboard-login';
import ProtectedRoute from './components/protected-route';
import RedirectIfAuthenticated from './components/authenticated-route';
import ProjectsPage from './pages/projects';

const MainLayout = ({ children }) => {
    const location = useLocation();
    const hideHeaderFooterPaths = ['/s_dashboard', '/dashboard_login'];

    return (
        <>
            {!hideHeaderFooterPaths.includes(location.pathname) && <Header />}
            {children}
            {!hideHeaderFooterPaths.includes(location.pathname) && <Footer />}
        </>
    );
};

function App() {
    return (
        <Router> {/* Use HashRouter here */}
            <MyContextProvider>
                <MainLayout>
                    <Routes>
                        <Route exact index element={<Home />} />
                        <Route exact path="about" element={<About />} />
                        <Route exact path="services" element={<Services />} />
                        <Route exact path="/services/:id" element={<ServiceDetailPage />} />
                        <Route exact path="projects" element={<ProjectsPage />} />
                        <Route exact path="/projects/:id" element={<ProjectDetailPage />} />
                        <Route exact path="inhouse-custom-design" element={<InHouseCustomDesign />} />
                        <Route exact path="faq" element={<Faqs />} />
                        <Route exact path="blogs" element={<Blogs />} />
                        <Route exact path="/blogs/:id" element={<BlogDetailPage />} />
                        <Route exact path="contact" element={<ContactUs />} />
                        <Route exact path="dashboard_login" element={
                            <RedirectIfAuthenticated>
                                <DashboardLogin />
                            </RedirectIfAuthenticated>
                        } />
                        <Route exact path="s_dashboard" element={
                            <ProtectedRoute>
                                <ServerDashboard />
                            </ProtectedRoute>
                        } />
                        <Route exact path="*" element={<NoPage />} />
                    </Routes>
                </MainLayout>
            </MyContextProvider>
        </Router>
    );
}

export default App;
