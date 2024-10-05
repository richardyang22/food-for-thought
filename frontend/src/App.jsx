import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home';
import { ResultsPage } from './pages/results';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
