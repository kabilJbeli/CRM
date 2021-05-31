import React, {useState} from "react";
import Menu from "../menu/Menu";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import _ from "lodash";
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {GetQuotesList} from "../../actions/QuoteActions";

const QuoteList = () => {

    const [quotes, setQuotes] = useState([]);
    const dispatch = useDispatch();
    const quotesList = useSelector(state => state.QuoteList);
    const [quoteState, setQuoteState] = useState({
        quote: {
            id:'',
            status:'Pending'
        }
    });
    React.useEffect(() => {
        fetchData();
        setQuotes(quotesList);
    }, []);

    const fetchData = () => {
        dispatch(GetQuotesList());
    }

    const actionsBodyTemplate = (rowData) => {
        return (<div>
                <button className="btn btn-outline-danger mr-2" disabled={rowData.status=='Validated' || rowData.status=='Denied'} onClick={ () =>updateQuoteStatus(this,'Denied',rowData.id)}>Deny</button>
                <button className="btn btn-outline-info" disabled={rowData.status=='Validated' || rowData.status=='Denied'} onClick={ () => updateQuoteStatus(this,'Validated',rowData.id)}>Validate</button>
        </div>);
    }

    const showData = () => {
        if (!_.isEmpty(quotesList.data) || _.isEmpty(quotesList.data)) {
            return (<div className="container-fluid datatable-responsive-demo " >
                <DataTable paginator rows={5} resizableColumns  columnResizeMode="fit" value={quotesList.data} className="p-datatable-striped p-datatable-gridlines p-datatable-responsive-demo">
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="total" header="Total" sortable></Column>
                    <Column field="reduction" header="Reduction" sortable></Column>
                    <Column field="status" header="Status" sortable></Column>
                    <Column field="clientID.name" header="Client" sortable></Column>
                    <Column header="Action" body={actionsBodyTemplate}></Column>
                </DataTable>
            </div>)
        }

        if (quotesList.loading) {
            return <p>Still Loading</p>
        }
        if (quotesList.errorMsg !== '') {
            return <p>{quotesList.errorMsg}</p>
        }

        return <p>Unable to get Data</p>
    }




    const updateQuoteStatus = (e,status,id) => {
        let quote = quoteState.quote;
        quote.status= status;
        quote.id =id;
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(quote)
        };
        dispatch({
            type: 'INVOKING_COMPANY_ADD_SERVICE'
        });
        fetch(`http://localhost:1337/quote/${id}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                fetchData();
                dispatch({
                        type: 'COMPANIES_ADDED_SUCCESSFULLY',
                        payload: response.data
                    }
                );


            })
            .catch(error => {
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
                })
            });
    };
    return (
        <div>
            <Menu/>
            {showData()}
        </div>
    )
}
export default QuoteList;