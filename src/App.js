import React from 'react'
import JokesGenerator from './jokesGenerator/JokesGenerator'
import ScrollToTop from './components/ScrollToTop';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <>
            <SiteHeader />
            <main id="top">
            <JokesGenerator />
            </main>
            <SiteFooter />
            <ScrollToTop />

            <ToastContainer />
        </>
    )
}

export default App

