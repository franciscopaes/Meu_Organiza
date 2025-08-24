import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import MinhasTarefas from '../pages/MinhasTarefas';
import Login from '../pages/Login';
import Graficos from '../pages/Graficos';
import Notificacoes from '../pages/Notificacoes';
import Configuracoes from '../pages/Configuracoes';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/tarefas" element={<MinhasTarefas />} />
                <Route path="/graficos" element={<Graficos />} />
                <Route path="/notificacoes" element={<Notificacoes />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
        </BrowserRouter>
    );
}