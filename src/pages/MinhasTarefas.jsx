import React, { useState } from 'react';
import './MinhasTarefas.css';
import Sidebar from '../componentes/Sidebar';
import Header from '../componentes/Header';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const tipos = ['Todos', 'Estudo', 'Trabalho', 'Pessoal', 'Outros'];

const MinhasTarefas = () => {
    const [novaTarefa, setNovaTarefa] = useState('');
    const [tipoTarefa, setTipoTarefa] = useState('Estudo');
    const [dataTarefa, setDataTarefa] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('Todos');
    const [filtroData, setFiltroData] = useState('');
    const [tarefas, setTarefas] = useState([
       
    ]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() === '' || !dataTarefa) return;
        const nova = {
            id: Date.now(),
            texto: novaTarefa,
            tipo: tipoTarefa,
            data: dataTarefa,
            concluida: false,
        };
        setTarefas([nova, ...tarefas]);
        setNovaTarefa('');
        setTipoTarefa('Estudo');
        setDataTarefa('');
    };

    const alternarConclusao = (id) => {
        const atualizadas = tarefas.map(t =>
            t.id === id ? { ...t, concluida: !t.concluida } : t
        );
        setTarefas(atualizadas);
    };

    const deletarTarefa = (id) => {
        setTarefas(tarefas.filter(t => t.id !== id));
    };

    const tarefasFiltradas = tarefas.filter(t =>
        (filtroTipo === 'Todos' || t.tipo === filtroTipo) &&
        (filtroData === '' || t.data === filtroData)
    );

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                
                <div className="dashboard-content">
                    <header className="headerTarefas">
                        <h1>Minhas Tarefas</h1>
                        <div className="filtros">
                            <select
                                value={filtroTipo}
                                onChange={e => setFiltroTipo(e.target.value)}
                                aria-label="Filtrar por tipo"
                            >
                                {tipos.map(tipo => (
                                    <option key={tipo} value={tipo}>{tipo}</option>
                                ))}
                            </select>

                            <input
                                type="date"
                                value={filtroData}
                                onChange={e => setFiltroData(e.target.value)}
                                aria-label="Filtrar por data"
                                max="2100-12-31"
                            />

                            {filtroData && (
                                <button
                                    onClick={() => setFiltroData('')}
                                    aria-label="Limpar filtro de data"
                                    className="btnLimparFiltro"
                                    title="Limpar filtro de data"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </header>

                    <section className="criarTarefa">
                        <input
                            type="text"
                            placeholder="Nova tarefa..."
                            value={novaTarefa}
                            onChange={e => setNovaTarefa(e.target.value)}
                            aria-label="Nova tarefa"
                        />
                        <select
                            value={tipoTarefa}
                            onChange={e => setTipoTarefa(e.target.value)}
                            aria-label="Tipo da tarefa"
                        >
                            {tipos.slice(1).map(tipo => (
                                <option key={tipo} value={tipo}>{tipo}</option>
                            ))}
                        </select>
                        <input
                            type="date"
                            value={dataTarefa}
                            onChange={e => setDataTarefa(e.target.value)}
                            aria-label="Data da tarefa"
                        />
                        <button onClick={adicionarTarefa} title="Adicionar tarefa" aria-label="Adicionar tarefa">
                            <FaPlus />
                        </button>
                    </section>

                    <ul className="listaTarefas">
                        {tarefasFiltradas.length === 0 && (
                            <li className="semTarefas">Nenhuma tarefa para mostrar</li>
                        )}
                        {tarefasFiltradas.map(tarefa => (
                            <li key={tarefa.id} className={tarefa.concluida ? 'concluida' : ''}>
                                <div className="infoTarefa">
                                    <strong>{tarefa.texto}</strong>
                                    <span>{tarefa.tipo} | {tarefa.data.split('-').reverse().join('/')}</span>
                                </div>
                                <div className="acoes">
                                    <button onClick={() => alternarConclusao(tarefa.id)} title="Concluir tarefa">
                                        <FaCheck />
                                    </button>
                                    <button onClick={() => deletarTarefa(tarefa.id)} title="Deletar tarefa">
                                        <FaTrash />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MinhasTarefas;
