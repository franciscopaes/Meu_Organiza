import React from 'react';
import Sidebar from '../componentes/Sidebar';
import Header from '../componentes/Header';
import './Notificacoes.css';

const notificacoes = [
  {
    id: 1,
    data: '01/08/2025',
    mensagem: 'Lembrete: entregar relatório semanal até às 18h.',
    importante: false,
  },
  {
    id: 2,
    data: '02/08/2025',
    mensagem: 'Tarefa agendada: revisar tarefas pendentes de quarta-feira.',
    importante: false,
  },
  {
    id: 3,
    data: '03/08/2025',
    mensagem: '⚠️ Meta semanal: concluir 5 tarefas até sexta-feira!',
    importante: true,
  },
];

export default function Notificacoes() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        <div className="dashboard-content">
          <header className="headerNotificacoes">
            <h1>Notificações</h1>
            <p>Acompanhe seus lembretes e alertas importantes</p>
          </header>

          <section className="listaNotificacoes">
            {notificacoes.length === 0 ? (
              <p className="semNotificacoes">Você não possui notificações no momento.</p>
            ) : (
              notificacoes.map(({ id, data, mensagem, importante }) => (
                <div
                  key={id}
                  className={`cardNotificacao ${importante ? 'cardImportante' : ''}`}
                >
                  <p className="textoNotificacao">{mensagem}</p>
                  <span className="dataNotificacao">{data}</span>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
