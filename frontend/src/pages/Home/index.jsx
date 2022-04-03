import {MarketTable} from '../../cmps/MarketTable'
import "./index.scss";


export function Home(){
   return(
       <div>
        <h1 className="header-title">Market Real Time</h1>
        <MarketTable/>
       </div>
   ) 
}
