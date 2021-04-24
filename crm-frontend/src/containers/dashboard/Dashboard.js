import React from "react";
import {Link} from "react-router-dom";

const Dashboard = () => {

    return (
        <div className="container-fluid dashboard-container">
            <div className="row">
                <div className="custom-box text-center">
                    <Link to="/companies"> Companies</Link>
                </div>
                <div className="custom-box text-center">
                    <Link to="/contacts"> Contacts</Link>
                </div>
                <div className="custom-box text-center">
                    <Link to="/items"> Items</Link>
                </div>
                <div className="custom-box text-center">
                    <Link to="/quotes"> Quotes</Link>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;