import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class ListCompany extends Component {
    constructor(props) {
        super(props);

        this.state = { companies: [] }

        this.DeleteCompany = this.DeleteCompany.bind(this);
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('https://localhost:5001/api/Product/GetCompanies', requestOptions)
            .then(x => x.json())
            .then(x => {
                //console.log(x);
                this.setState({ companies: x })
            })
            .catch(error => {
                alert('Fetching Selectbox: ' + error.toString());
            });
    }

    DeleteCompany(event) {
        event.preventDefault();
        var companyId = parseInt(event.target.value);

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://localhost:5001/api/Product/DeleteCompany/' + companyId, requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.status === true) {
                    for (var i in this.state.companies) {
                        if (this.state.companies[i].id === companyId) {
                            this.state.companies.splice(i, 1);
                            this.setState({ companies: this.state.companies });
                            return;
                        }
                    }
                }
                else
                    alert('Something went wrong! ' + res.error);
            })
            .catch(error => {
                alert('Fetching: ' + error.toString());
            });
    }

    render() {
        return (
            <div className='mt-3'>
                <h3 className='mx-2'>Company List</h3>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Company Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.companies.map((x, i) => {
                                    return (
                                        <tr>
                                            <td>{x.id}</td>
                                            <td>{x.companyName}</td>
                                            <td width='20%'>
                                                <Link to={`/editcompany/${x.id}`} >
                                                    <button className="btn btn-primary mr-1">Edit</button>
                                                </Link>
                                                <button onClick={this.DeleteCompany} value={x.id}
                                                    className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table >
                </div >
            </div>
        );
    }
}
