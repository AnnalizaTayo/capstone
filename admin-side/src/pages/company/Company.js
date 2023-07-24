import Single from "../../components/single/Single";
import { singleUser } from "../../data";
import "./company.scss";

const Company = () => {

  //Fetch data and send to Single Component
  
  return (
    <div className="user">
      <Single {...singleUser}/>
    </div>
  )
}

export default Company;