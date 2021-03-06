import React, { createContext, FC, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Breeding from './routes/Breeding/Breeding';
import Game from './routes/Game/Game';
import Main from './routes/Main/Main';
import Marketplace from './routes/Marketplace/Marketplace';
import MyNFTPage from './routes/MyNFTPage/MyNFTPage';

export const accountContext = createContext({
  account: '',
});

const App: FC = () => {
  const [account, setAccount] = useState<string>('');

  // getAccount: 메타마스크 팝업과 계정 연결
  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setAccount(accounts[0]);
      } else {
        alert('메타마스크를 설치해주세요');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, [account]);

  return (
    <BrowserRouter>
      <Header getAccount={getAccount}>
        <accountContext.Provider value={{ account }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Marketplace" element={<Marketplace />} />
            <Route path="/MyNFTPage" element={<MyNFTPage />} />
            <Route path="/Breeding" element={<Breeding />} />
            <Route path="/Game" element={<Game />} />
          </Routes>
        </accountContext.Provider>
      </Header>
    </BrowserRouter>
  );
};

export default App;
