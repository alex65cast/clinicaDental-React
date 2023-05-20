
import './App.css'
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Body } from './layouts/Body/Body'

function App(){

  return (
    <div className='appDesign'>
      <Header />
      <Body />
      <Footer />      
    </div>
  )
}

export default App;