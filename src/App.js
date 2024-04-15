import React from 'react'
import JokesGenerator from './jokesGenerator/JokesGenerator'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <JokesGenerator />

            <ToastContainer />
        </div>
    )
}

export default App

