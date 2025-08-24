import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import './Home.css';
import Sidebar from '../componentes/Sidebar';
import Header from '../componentes/Header';
import { AiOutlineCheckSquare, AiOutlineClockCircle, AiOutlineCalendar } from 'react-icons/ai';

const dadosBarra = [
  { name: 'Seg', tarefas: 2 },
  { name: 'Ter', tarefas: 3 },
  { name: 'Qua', tarefas: 3 },
  { name: 'Qui', tarefas: 2 },
  { name: 'Sex', tarefas: 1 },
];

const dadosPizza = [
  { name: 'Estudo', value: 4 },
  { name: 'Trabalho', value: 3 },
  { name: 'Pessoal', value: 2 },
  { name: 'Outros', value: 2 },
];

const coresPizza = ['#4a90e2', '#10b981', '#ff9500', '#8b5cf6'];

const Home = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        <div className="dashboard-content">
          <h1 className="dashboard-title">Início</h1>

          {/* Cards de Resumo */}
          <section className="summary-cards">
            <div className="summary-card">
              <div className="card-icon">
                <AiOutlineCheckSquare />
              </div>
              <div className="card-content">
                <span className="card-number">4</span>
                <span className="card-label">Tarefas Pendentes</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon">
                <AiOutlineClockCircle />
              </div>
              <div className="card-content">
                <span className="card-number">7</span>
                <span className="card-label">Tarefas Concluídas</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="card-icon">
                <AiOutlineCalendar />
              </div>
              <div className="card-content">
                <span className="card-number">11</span>
                <span className="card-label">Total na Semana</span>
              </div>
            </div>
          </section>

          {/* Gráficos */}
          <section className="charts-grid">
            {/* Gráfico de Barras - Produtividade da Semana */}
            <div className="chart-card">
              <h3>Produtividade da Semana</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dadosBarra}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="name" stroke="#b0b0b0" />
                  <YAxis stroke="#b0b0b0" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2d2d2d', 
                      border: '1px solid #404040',
                      color: '#ffffff'
                    }}
                  />
                  <Bar dataKey="tarefas" fill="#4a90e2" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de Pizza - Distribuição por Categoria */}
            <div className="chart-card">
              <h3>Distribuição por Categoria</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dadosPizza}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dadosPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={coresPizza[index % coresPizza.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #404040',
                      color: '#ffffff'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
