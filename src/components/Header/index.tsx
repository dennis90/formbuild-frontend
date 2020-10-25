import React from 'react';
import { Link } from 'react-router-dom';

import { CREATE, LIST } from 'config/routes';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="font-bold flex flex-row justify-between">
        <div className="text-3xl">
          @sigaofluxo
        </div>

        <div className="my-auto">
          Perfil
        </div>
      </div>

      <div className="font-semibold flex justify-around my-8">
        <Link to={CREATE}>Criar!</Link>
        <Link to={LIST}>Meus formulários</Link>
        <a href="#">Minhas respostas</a>
      </div>
    </div>
  );
};

export default Header;
