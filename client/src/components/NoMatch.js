import '../assets/styles/NoMatch.css'
import { Link } from "react-router-dom"

const NoMatch = () => {
    return ( 
        <>
        <div id="no-match"> No Webpage found! </div>
        <div id="dead-icon"><i class="fa fa-times"></i></div>
        <div id="redirect"> Sorry about that. <br></br> We'll get working on it immediately. <br></br> For now, please return to the <Link to="/">login screen:</Link> </div>
        </>
     );
}
 
export default NoMatch;