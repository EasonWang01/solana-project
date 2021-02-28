import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { Button } from 'antd';

const Home = () => (
  <div style={{marginTop: '40px'}}>
    <div style={{ display: 'flex', margin: '50px', flexWrap: 'wrap', marginTop: '-20px',justifyContent: 'space-between' }}>
      <div style={{ marginTop: '20px' }}>NFT 3D Marketplace</div>
      <div style={{ display: 'flex'}}>
        <div style={{ marginRight: '10px', marginTop: '20px' }}><Link to="market"><Button type="dashed">Market</Button></Link></div>
        <div style={{ marginRight: '10px', marginTop: '20px' }}><Link to="/projects"><Button type="dashed">Projects</Button></Link></div>
        <div style={{ marginTop: '20px' }}><Link to="/templates"><Button type="dashed">Templates</Button></Link></div>
      </div>
    </div>
  </div>
)
export default Home