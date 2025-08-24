import React from 'react';
import Sidebar from '../componentes/Sidebar';
import Header from '../componentes/Header';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts';
import './Graficos.css';

const dadosTarefasPorDia = [
  { name: 'Seg', criadas: 3, concluídas: 3 },
  { name: 'Ter', criadas: 2, concluídas: 2 },
  { name: 'Qua', criadas: 2, concluídas: 1 },
  { name: 'Qui', criadas: 3, concluídas: 3 },
  { name: 'Sex', criadas: 2, concluídas: 1 },
  { name: 'Sáb', criadas: 0, concluídas: 0 },
  { name: 'Dom', criadas: 0, concluídas: 0 },
];

const dadosEvolucao = [
  { dia: '01', concluídas: 1 },
  { dia: '02', concluídas: 3 },
  { dia: '03', concluídas: 4 },
  { dia: '04', concluídas: 5 },
  { dia: '05', concluídas: 7 },
  { dia: '06', concluídas: 8 },
  { dia: '07', concluídas: 10 },
];

const Graficos = () => {
  const totalCriadas = dadosTarefasPorDia.reduce((acc, d) => acc + d.criadas, 0);
  const totalConcluidas = dadosTarefasPorDia.reduce((acc, d) => acc + d.concluídas, 0);
  const percentualConcluido = totalCriadas ? Math.round((totalConcluidas / totalCriadas) * 100) : 0;
  const pendentes = totalCriadas - totalConcluidas;

  const metasDiarias = dadosTarefasPorDia.map(d => ({
    dia: d.name,
    alcancada: d.concluídas >= d.criadas && d.criadas > 0,
  }));

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        <div className="dashboard-content">
          <header className="headerGraficos">
            <h1>Painel de Produtividade</h1>
            <p>Visualize seu progresso e alcance suas metas diárias!</p>
          </header>

          {/* Cards resumo */}
          <section className="cardsResumoGraficos">
            <div className="cardResumo">
              <span className="numeroResumo">{totalCriadas}</span>
              <span className="descricaoResumo">Tarefas Criadas</span>
            </div>
            <div className="cardResumo">
              <span className="numeroResumo">{totalConcluidas}</span>
              <span className="descricaoResumo">Tarefas Concluídas</span>
            </div>
            <div className="cardResumo">
              <span className="numeroResumo">{pendentes}</span>
              <span className="descricaoResumo">Tarefas Pendentes</span>
            </div>
            <div className="cardResumo">
              <span className="numeroResumo">{percentualConcluido}%</span>
              <span className="descricaoResumo">Conclusão</span>
            </div>
          </section>

          {/* Metas diárias */}
          <section className="metasDiariasContainer">
            <h3>Seu progresso semanal</h3>
            <p className="descricaoMetas">Últimos 7 dias</p>
            <span className="progressoTexto">
              {metasDiarias.filter(m => m.alcancada).length}/{metasDiarias.length} Atingidas
            </span>

            <div className="metasDiasEstilizadas">
              {metasDiarias.map(({ dia, alcancada }) => (
                <div key={dia} className="metaDiaEstilizada">
                  <div
                    className={`circuloModerno ${alcancada ? 'meta-ok' : 'meta-nok'}`}
                    title={alcancada ? 'Meta atingida' : 'Meta pendente'}
                  >
                    <div className="circuloInterno" />
                  </div>
                  <span className="nomeDia">{dia.charAt(0)}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Gráficos lado a lado */}
          <section className="graficosLadoALado">
            <section className="graficoItemFullWidth">
              <h3>Tarefas Criadas e Concluídas por Dia</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dadosTarefasPorDia} margin={{ top: 10, right: 30, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="name" stroke="#b0b0b0" />
                  <YAxis allowDecimals={false} stroke="#b0b0b0" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2d2d2d', 
                      border: '1px solid #404040',
                      color: '#ffffff'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="concluídas" fill="#10b981" name="Concluídas" />
                  <Bar dataKey="criadas" fill="#4a90e2" name="Criadas" />
                </BarChart>
              </ResponsiveContainer>
            </section>

            <section className="graficoItemFullWidth">
              <h3>Evolução das Tarefas Concluídas</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dadosEvolucao} margin={{ top: 10, right: 30, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                  <XAxis dataKey="dia" stroke="#b0b0b0" />
                  <YAxis allowDecimals={false} stroke="#b0b0b0" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2d2d2d', 
                      border: '1px solid #404040',
                      color: '#ffffff'
                    }}
                  />
                  <Line type="monotone" dataKey="concluídas" stroke="#4a90e2" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </section>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Graficos;
