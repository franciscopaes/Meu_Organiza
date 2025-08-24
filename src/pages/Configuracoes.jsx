import React, { useState } from 'react';
import './Configuracoes.css';
import Sidebar from '../componentes/Sidebar';
import Header from '../componentes/Header';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave, FaEdit } from 'react-icons/fa';

const Configuracoes = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        nome: 'Thiago Francisco',
        email: 'thiago@gmail.com',
        telefone: '(11) 99999-9999',
        cidade: 'Hortolândia',
        estado: 'SP',
    });

    const [formData, setFormData] = useState(userData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setUserData(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(userData);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                
                <div className="dashboard-content">
                    <div className="configuracoes-header">
                        <h1 className="dashboard-title">Configurações</h1>
                        <p className="configuracoes-subtitle">Gerencie suas informações pessoais</p>
                    </div>

                    <div className="configuracoes-container">
                        <div className="profile-card">
                            <div className="profile-header">
                                <div className="profile-avatar">
                                    <FaUser />
                                </div>
                                <div className="profile-info">
                                    <h2>{userData.nome}</h2>
                                    <p>{userData.email}</p>
                                </div>
                                <div className="profile-actions">
                                    {!isEditing ? (
                                        <button 
                                            onClick={handleEdit}
                                            className="btn-edit"
                                            title="Editar perfil"
                                        >
                                            <FaEdit />
                                            Editar
                                        </button>
                                    ) : (
                                        <div className="edit-actions">
                                            <button 
                                                onClick={handleSave}
                                                className="btn-save"
                                                title="Salvar alterações"
                                            >
                                                <FaSave />
                                                Salvar
                                            </button>
                                            <button 
                                                onClick={handleCancel}
                                                className="btn-cancel"
                                                title="Cancelar edição"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="profile-form">
                                <div className="form-section">
                                    <h3>Informações Pessoais</h3>
                                    
                                    <div className="form-group">
                                        <label htmlFor="nome">
                                            <FaUser />
                                            Nome Completo
                                        </label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Digite seu nome completo"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <FaEnvelope />
                                            E-mail
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Digite seu e-mail"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="telefone">
                                            <FaPhone />
                                            Telefone
                                        </label>
                                        <input
                                            type="tel"
                                            id="telefone"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Digite seu telefone"
                                        />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="cidade">
                                                <FaMapMarkerAlt />
                                                Cidade
                                            </label>
                                            <input
                                                type="text"
                                                id="cidade"
                                                name="cidade"
                                                value={formData.cidade}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="Digite sua cidade"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="estado">Estado</label>
                                            <input
                                                type="text"
                                                id="estado"
                                                name="estado"
                                                value={formData.estado}
                                                onChange={handleInputChange}
                                                disabled={!isEditing}
                                                placeholder="UF"
                                                maxLength="2"
                                            />
                                        </div>
                                    </div>

                                </div>

                                {!isEditing && (
                                    <div className="info-section">
                                        <h3>Informações da Conta</h3>
                                        <div className="info-item">
                                            <span className="info-label">Membro desde:</span>
                                            <span className="info-value">Agosto 2025</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Último login:</span>
                                            <span className="info-value">Hoje às 14:30</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Status da conta:</span>
                                            <span className="info-value status-active">Ativa</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracoes;




