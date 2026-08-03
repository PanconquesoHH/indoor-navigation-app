import React from 'react';
import { Compass, MapPin } from 'lucide-react';
import escudoTurismo from '../assets/escudo_turismo.png';
import turismoBg from '../assets/turismo-bg.png';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      <div
        className="welcome-screen__bg"
        style={{ backgroundImage: `url(${turismoBg})` }}
        aria-hidden="true"
      />
      <div className="welcome-screen__overlay" aria-hidden="true" />

      <div className="welcome-screen__content">
        <div className="welcome-screen__card">
          <div className="welcome-screen__escudo-wrap">
            <img
              src={escudoTurismo}
              alt="Escudo de la Carrera de Turismo USFX"
              className="welcome-screen__escudo"
            />
          </div>

          <div className="welcome-screen__text">
            <div className="welcome-screen__badge">
              <Compass size={16} />
              <span>Navegación Interior</span>
            </div>

            <h1 className="welcome-screen__title">Carrera de Turismo USFX</h1>
            <p className="welcome-screen__subtitle">
              Universidad de San Francisco Xavier · Sucre, Bolivia
            </p>
            <p className="welcome-screen__description">
              Explora el edificio, busca aulas y oficinas, y obtén rutas paso a paso dentro del campus.
            </p>
          </div>

          <button type="button" className="welcome-screen__btn" onClick={onStart}>
            <MapPin size={20} />
            Empezar
          </button>
        </div>
      </div>
    </div>
  );
}
