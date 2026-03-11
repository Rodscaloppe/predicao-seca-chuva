import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SistemaPredicaoTerreno() {
  const [activePoint, setActivePoint] = useState('ponto1');

  const pontosMicrocontrolador = {
    ponto1: {
      nome: 'Ponto de Sensores 1 - Vale',
      cor: '#FF6B6B',
      temperatura: 32.5,
      umidade: 45.2,
      umidadeSolo: 38.5,
      dados_historicos: [
        { mes: 'Jan', temp: 28, umid: 55 },
        { mes: 'Fev', temp: 29, umid: 52 },
        { mes: 'Mar', temp: 31, umid: 48 },
        { mes: 'Abr', temp: 32, umid: 42 },
        { mes: 'Mai', temp: 33, umid: 38 },
        { mes: 'Jun', temp: 32.5, umid: 45 },
      ]
    },
    ponto2: {
      nome: 'Ponto de Sensores 2 - Planalto',
      cor: '#4ECDC4',
      temperatura: 28.3,
      umidade: 58.7,
      umidadeSolo: 52.3,
      dados_historicos: [
        { mes: 'Jan', temp: 26, umid: 62 },
        { mes: 'Fev', temp: 27, umid: 60 },
        { mes: 'Mar', temp: 28, umid: 58 },
        { mes: 'Abr', temp: 28.5, umid: 56 },
        { mes: 'Mai', temp: 29, umid: 52 },
        { mes: 'Jun', temp: 28.3, umid: 58.7 },
      ]
    },
    ponto3: {
      nome: 'Ponto de Sensores 3 - Cerrado',
      cor: '#FFE66D',
      temperatura: 30.8,
      umidade: 51.4,
      umidadeSolo: 44.2,
      dados_historicos: [
        { mes: 'Jan', temp: 29, umid: 58 },
        { mes: 'Fev', temp: 30, umid: 55 },
        { mes: 'Mar', temp: 31, umid: 50 },
        { mes: 'Abr', temp: 31.5, umid: 46 },
        { mes: 'Mai', temp: 32, umid: 42 },
        { mes: 'Jun', temp: 30.8, umid: 51.4 },
      ]
    }
  };

  const pontosAtivo = pontosMicrocontrolador[activePoint];

  const dadosSatelite = [
    { data: 'Jun-01', ndvi: 0.65, evapotransp: 4.2 },
    { data: 'Jun-08', ndvi: 0.63, evapotransp: 4.5 },
    { data: 'Jun-15', ndvi: 0.61, evapotransp: 4.8 },
    { data: 'Jun-22', ndvi: 0.59, evapotransp: 5.1 },
    { data: 'Jun-29', ndvi: 0.58, evapotransp: 5.3 },
  ];

  const predicaoML = [
    { semana: 'Semana 1', seca_prob: 15, chuva_prob: 35, normal_prob: 50 },
    { semana: 'Semana 2', seca_prob: 28, chuva_prob: 25, normal_prob: 47 },
    { semana: 'Semana 3', seca_prob: 42, chuva_prob: 18, normal_prob: 40 },
    { semana: 'Semana 4', seca_prob: 55, chuva_prob: 12, normal_prob: 33 },
  ];

  const alertas = [
    { tipo: 'SECA', mensagem: 'Previsao de seca severa em 3-4 semanas', dias: 21 },
    { tipo: 'ALERTA', mensagem: 'Umidade do solo abaixo do esperado', dias: 5 },
    { tipo: 'INFO', mensagem: 'Manutencao de sensores necessaria', dias: 14 },
  ];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f3a5a 100%)',
      color: '#e2e8f0',
      minHeight: '100vh',
      fontFamily: 'sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Sistema Integrado de Previsao de Terreno
        </h1>
        <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem' }}>
          Microcontroladores + Sensores Terrestres + Machine Learning
        </p>

        {/* Seletor de Pontos */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            3 Pontos de Microcontrolador
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {Object.entries(pontosMicrocontrolador).map(([key, ponto]) => (
              <div
                key={key}
                onClick={() => setActivePoint(key)}
                style={{
                  background: activePoint === key ? 'rgba(96, 165, 250, 0.2)' : 'rgba(100, 116, 139, 0.1)',
                  border: activePoint === key ? '2px solid #60a5fa' : '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '0.75rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <strong>{ponto.nome.split(' - ')[1]}</strong>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '0.5rem' }}>
                  {ponto.temperatura}°C | {ponto.umidade}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid de conteudo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Detalhes */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h2 style={{ marginBottom: '1rem' }}>{pontosAtivo.nome}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Temperatura', valor: pontosAtivo.temperatura + 'C' },
                { label: 'Umidade Ar', valor: pontosAtivo.umidade + '%' },
                { label: 'Umidade Solo', valor: pontosAtivo.umidadeSolo + '%' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'rgba(100, 116, 139, 0.1)',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{item.label}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: pontosAtivo.cor }}>
                    {item.valor}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grafico de Tendencias */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Tendencias Historicas</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={pontosAtivo.dados_historicos}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="mes" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b' }} />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke={pontosAtivo.cor} strokeWidth={2} name="Temperatura" />
                <Line type="monotone" dataKey="umid" stroke="#60a5fa" strokeWidth={2} name="Umidade" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Dados de Satelite */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Dados de Satelite</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dadosSatelite}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="data" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b' }} />
                <Legend />
                <Line type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={2} name="NDVI" />
                <Line type="monotone" dataKey="evapotransp" stroke="#f59e0b" strokeWidth={2} name="Evapotranspiracao" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Previsoes ML */}
          <div style={{ 
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Previsoes ML</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={predicaoML}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="semana" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b' }} />
                <Legend />
                <Bar dataKey="seca_prob" fill="#f97316" name="Seca" />
                <Bar dataKey="chuva_prob" fill="#0ea5e9" name="Chuva" />
                <Bar dataKey="normal_prob" fill="#10b981" name="Normal" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alertas */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '1rem',
          padding: '1.5rem',
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Alertas do Sistema</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {alertas.map((alerta, idx) => (
              <div key={idx} style={{
                background: 'rgba(100, 116, 139, 0.1)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <strong>{alerta.tipo}</strong>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#cbd5e1' }}>
                  {alerta.mensagem}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                  Em {alerta.dias} dias
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
