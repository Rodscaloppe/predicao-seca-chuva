import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Activity, Satellite, Zap, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function SistemaPredicaoTerreno() {
  const [activePoint, setActivePoint] = useState('ponto1');
  const [animateData, setAnimateData] = useState(false);

  useEffect(() => {
    setAnimateData(true);
  }, []);

  // Dados simulados dos 3 pontos de microcontrolador
  const pontosMicrocontrolador = {
    ponto1: {
      nome: 'Ponto de Sensores #1 - Região Vale',
      cor: '#FF6B6B',
      latitude: '-15.7939',
      longitude: '-48.0694',
      temperatura: 32.5,
      umidade: 45.2,
      pressao: 1013.25,
      umidadeSolo: 38.5,
      salinidade: 2.1,
      sensibilidade: 92,
      bateria: 87,
      sinal: 95,
      dados_historicos: [
        { mes: 'Jan', temp: 28, umid: 55, secaSemanal: 15 },
        { mes: 'Fev', temp: 29, umid: 52, secaSemanal: 20 },
        { mes: 'Mar', temp: 31, umid: 48, secaSemanal: 35 },
        { mes: 'Abr', temp: 32, umid: 42, secaSemanal: 52 },
        { mes: 'Mai', temp: 33, umid: 38, secaSemanal: 78 },
        { mes: 'Jun', temp: 32.5, umid: 45, secaSemanal: 65 },
      ]
    },
    ponto2: {
      nome: 'Ponto de Sensores #2 - Região Planalto',
      cor: '#4ECDC4',
      latitude: '-15.8267',
      longitude: '-47.8744',
      temperatura: 28.3,
      umidade: 58.7,
      pressao: 1015.82,
      umidadeSolo: 52.3,
      salinidade: 1.8,
      sensibilidade: 96,
      bateria: 92,
      sinal: 98,
      dados_historicos: [
        { mes: 'Jan', temp: 26, umid: 62, chuva: 120 },
        { mes: 'Fev', temp: 27, umid: 60, chuva: 135 },
        { mes: 'Mar', temp: 28, umid: 58, chuva: 110 },
        { mes: 'Abr', temp: 28.5, umid: 56, chuva: 85 },
        { mes: 'Mai', temp: 29, umid: 52, chuva: 45 },
        { mes: 'Jun', temp: 28.3, umid: 58.7, chuva: 95 },
      ]
    },
    ponto3: {
      nome: 'Ponto de Sensores #3 - Região Cerrado',
      cor: '#FFE66D',
      latitude: '-15.6553',
      longitude: '-48.2419',
      temperatura: 30.8,
      umidade: 51.4,
      pressao: 1014.15,
      umidadeSolo: 44.2,
      salinidade: 2.3,
      sensibilidade: 89,
      bateria: 78,
      sinal: 92,
      dados_historicos: [
        { mes: 'Jan', temp: 29, umid: 58, indice: 62 },
        { mes: 'Fev', temp: 30, umid: 55, indice: 58 },
        { mes: 'Mar', temp: 31, umid: 50, indice: 52 },
        { mes: 'Abr', temp: 31.5, umid: 46, indice: 42 },
        { mes: 'Mai', temp: 32, umid: 42, indice: 28 },
        { mes: 'Jun', temp: 30.8, umid: 51.4, indice: 45 },
      ]
    }
  };

  const pontosAtivo = pontosMicrocontrolador[activePoint];

  // Dados de análise de satélite
  const dadosSatelite = [
    { data: 'Jun-01', ndvi: 0.65, evapotransp: 4.2, cobertura_nuvem: 15 },
    { data: 'Jun-08', ndvi: 0.63, evapotransp: 4.5, cobertura_nuvem: 22 },
    { data: 'Jun-15', ndvi: 0.61, evapotransp: 4.8, cobertura_nuvem: 18 },
    { data: 'Jun-22', ndvi: 0.59, evapotransp: 5.1, cobertura_nuvem: 12 },
    { data: 'Jun-29', ndvi: 0.58, evapotransp: 5.3, cobertura_nuvem: 8 },
  ];

  // Dados do modelo ML
  const predicaoML = [
    { semana: 'Semana 1', confianca: 92, seca_prob: 15, chuva_prob: 35, normal_prob: 50 },
    { semana: 'Semana 2', confianca: 88, seca_prob: 28, chuva_prob: 25, normal_prob: 47 },
    { semana: 'Semana 3', confianca: 85, seca_prob: 42, chuva_prob: 18, normal_prob: 40 },
    { semana: 'Semana 4', confianca: 82, seca_prob: 55, chuva_prob: 12, normal_prob: 33 },
  ];

  const alertas = [
    { tipo: 'SECA', severidade: 'ALTA', mensagem: 'Previsão de seca severa em 3-4 semanas', dias: 21 },
    { tipo: 'ALERTA', severidade: 'MÉDIA', mensagem: 'Umidade do solo abaixo do esperado', dias: 5 },
    { tipo: 'INFO', severidade: 'BAIXA', mensagem: 'Manutenção de sensores necessária em ponto 3', dias: 14 },
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f3a5a 100%)',
      color: '#e2e8f0',
      minHeight: '100vh',
      fontFamily: "'Geist', 'SF Pro Display', sans-serif",
      overflow: 'auto',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem', animation: animateData ? 'fadeIn 0.8s ease' : 'none' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Sistema Integrado de Previsão de Terreno
          </h1>
          <p style={{ fontSize: '1rem', color: '#94a3b8', marginTop: '0.5rem' }}>
            Antecipação de Seca e Chuva com Microcontroladores, Sensores Terrestres e ML Avançado
          </p>
        </div>

        {/* Grid Principal */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Seleção de Pontos de Microcontrolador */}
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ 
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              borderRadius: '1rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={20} style={{ color: '#fbbf24' }} /> 3 Pontos de Microcontrolador
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {Object.entries(pontosMicrocontrolador).map(([key, ponto]) => (
                  <div
                    key={key}
                    onClick={() => setActivePoint(key)}
                    style={{
                      background: activePoint === key 
                        ? `linear-gradient(135deg, ${ponto.cor}22 0%, ${ponto.cor}44 100%)`
                        : 'rgba(100, 116, 139, 0.1)',
                      border: `2px solid ${activePoint === key ? ponto.cor : 'rgba(148, 163, 184, 0.2)'}`,
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: activePoint === key ? 'scale(1.02)' : 'scale(1)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = ponto.cor}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = activePoint === key ? ponto.cor : 'rgba(148, 163, 184, 0.2)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <MapPin size={16} style={{ color: ponto.cor }} />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {ponto.nome.split(' - ')[1]}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                      {ponto.latitude}, {ponto.longitude}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                      <div>
                        <div style={{ color: '#94a3b8' }}>Temp</div>
                        <div style={{ fontWeight: 600, color: ponto.cor }}>{ponto.temperatura}°C</div>
                      </div>
                      <div>
                        <div style={{ color: '#94a3b8' }}>Umidade</div>
                        <div style={{ fontWeight: 600, color: ponto.cor }}>{ponto.umidade}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detalhes do Ponto Ativo */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              {pontosAtivo.nome}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Temperatura', valor: `${pontosAtivo.temperatura}°C`, icon: '🌡️' },
                { label: 'Umidade Ar', valor: `${pontosAtivo.umidade}%`, icon: '💧' },
                { label: 'Pressão', valor: `${pontosAtivo.pressao} mb`, icon: '🌪️' },
                { label: 'Umidade Solo', valor: `${pontosAtivo.umidadeSolo}%`, icon: '🌱' },
                { label: 'Salinidade', valor: `${pontosAtivo.salinidade} ppm`, icon: '⚗️' },
                { label: 'Sensibilidade', valor: `${pontosAtivo.sensibilidade}%`, icon: '📡' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(100, 116, 139, 0.1)',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: pontosAtivo.cor }}>
                    {item.valor}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Bateria', valor: pontosAtivo.bateria, cor: '#10b981' },
                { label: 'Sinal', valor: pontosAtivo.sinal, cor: '#3b82f6' },
                { label: 'Status', valor: 'Ativo', cor: '#06b6d4' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: `linear-gradient(135deg, ${item.cor}22 0%, ${item.cor}11 100%)`,
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  border: `1px solid ${item.cor}44`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: item.cor }}>
                    {item.valor}{item.label !== 'Status' ? '%' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico de Tendências Históricas */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Tendências Históricas
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={pontosAtivo.dados_historicos}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                {pontosAtivo.dados_historicos[0].secaSemanal && (
                  <Line type="monotone" dataKey="secaSemanal" stroke="#f97316" strokeWidth={2} name="Índice Seca" dot={{ fill: '#f97316' }} />
                )}
                {pontosAtivo.dados_historicos[0].chuva && (
                  <Line type="monotone" dataKey="chuva" stroke="#0ea5e9" strokeWidth={2} name="Chuva (mm)" dot={{ fill: '#0ea5e9' }} />
                )}
                {pontosAtivo.dados_historicos[0].indice && (
                  <Line type="monotone" dataKey="indice" stroke="#06b6d4" strokeWidth={2} name="Índice de Umidade" dot={{ fill: '#06b6d4' }} />
                )}
                <Line type="monotone" dataKey="temp" stroke={pontosAtivo.cor} strokeWidth={2} name="Temperatura" dot={{ fill: pontosAtivo.cor }} />
                <Line type="monotone" dataKey="umid" stroke="#60a5fa" strokeWidth={2} name="Umidade" dot={{ fill: '#60a5fa }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Integração com Dados de Satélite */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Satellite size={18} style={{ color: '#a78bfa' }} /> Dados de Satélite (NDVI & Evapotranspiração)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dadosSatelite}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="data" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Line type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={2} name="NDVI (Vigor Vegetação)" dot={{ fill: '#10b981' }} />
                <Line type="monotone" dataKey="evapotransp" stroke="#f59e0b" strokeWidth={2} name="Evapotranspiração (mm/dia)" dot={{ fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segunda linha de gráficos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Previsões ML */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} style={{ color: '#ec4899' }} /> Previsões ML - Próximas 4 Semanas
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={predicaoML}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="semana" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Bar dataKey="seca_prob" fill="#f97316" name="Probabilidade Seca %" />
                <Bar dataKey="chuva_prob" fill="#0ea5e9" name="Probabilidade Chuva %" />
                <Bar dataKey="normal_prob" fill="#10b981" name="Condição Normal %" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Análise de Confiança do ML */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
              Confiança do Modelo ML por Semana
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={predicaoML}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="semana" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="confianca" 
                  stroke="#a78bfa" 
                  strokeWidth={3}
                  name="Confiança (%)"
                  dot={{ fill: '#a78bfa', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alertas */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} style={{ color: '#ef4444' }} /> Alertas do Sistema
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {alertas.map((alerta, idx) => {
              const corAlerta = alerta.tipo === 'SECA' ? '#ef4444' : alerta.tipo === 'ALERTA' ? '#f97316' : '#0ea5e9';
              return (
                <div key={idx} style={{
                  background: `linear-gradient(135deg, ${corAlerta}22 0%, ${corAlerta}11 100%)`,
                  border: `1px solid ${corAlerta}44`,
                  borderRadius: '0.75rem',
                  padding: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <AlertTriangle size={16} style={{ color: corAlerta }} />
                    <span style={{ fontWeight: 600, color: corAlerta }}>{alerta.tipo}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                    {alerta.mensagem}
                  </p>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    ⏰ Em {alerta.dias} dias
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fluxo Arquitetural */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Arquitetura do Sistema de Coleta e Análise
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
            {[
              { titulo: '3 Pontos de\nMicrocontrolador', cor: '#ff6b6b', emoji: '📍' },
              { titulo: 'Sensores\nTerrestres', cor: '#4ecdc4', emoji: '🌍' },
              { titulo: 'Dados de\nSatélite', cor: '#a78bfa', emoji: '🛰️' },
              { titulo: 'Pré-processamento\nDados', cor: '#fbbf24', emoji: '⚙️' },
              { titulo: 'Modelo ML\nAvançado', cor: '#ec4899', emoji: '🤖' },
              { titulo: 'Análise &\nPadrões', cor: '#0ea5e9', emoji: '📊' },
              { titulo: 'Previsões &\nAlertas', cor: '#10b981', emoji: '🎯' },
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  background: `linear-gradient(135deg, ${item.cor}33 0%, ${item.cor}11 100%)`,
                  border: `2px solid ${item.cor}`,
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  minWidth: '120px',
                  animation: animateData ? `slideInUp 0.6s ease ${idx * 0.1}s both` : 'none'
                }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{item.emoji}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', lineHeight: '1.2' }}>
                    {item.titulo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Técnico */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Sistema Integrado de Previsão de Seca e Chuva com IA
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
            <div>
              <strong style={{ color: '#cbd5e1' }}>Microcontroladores:</strong><br/>
              STM32L476 com sensores analógicos de 12-bit
            </div>
            <div>
              <strong style={{ color: '#cbd5e1' }}>Transmissão:</strong><br/>
              LoRaWAN + MQTT com 4G backup
            </div>
            <div>
              <strong style={{ color: '#cbd5e1' }}>Modelo ML:</strong><br/>
              Random Forest + LSTM Neural Networks
            </div>
            <div>
              <strong style={{ color: '#cbd5e1' }}>Atualização:</strong><br/>
              Dados em tempo real a cada 15 minutos
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
