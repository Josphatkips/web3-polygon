import React from 'react';
import './style.css';
import TradeViewChart from 'react-crypto-chart';

export default function Chart() {
  return (
    <div className="parent flex flex-col space-y-6">

        <div className='flex flex-col'>
        <h3>BTC/USDT</h3>
      <TradeViewChart
        containerStyle={{
          minHeight: '300px',
          minWidth: '400px',
          marginBottom: '30px',
        }}
        pair="BTCUSDT"
      />
            
        </div>
        
      
      
    </div>
  );
}
