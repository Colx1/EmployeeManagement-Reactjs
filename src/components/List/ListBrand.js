import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class ListBrand extends Component {
    constructor(props) {
        super(props);

        this.state = { brands: [] }

        this.DeleteBrand = this.DeleteBrand.bind(this);
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('https://localhost:5001/api/Product/GetBrands/true', requestOptions)
            .then(x => x.json())
            .then(x => {
                //console.log(x);
                this.setState({ brands: x })
            })
            .catch(error => {
                alert('Fetching Selectbox: ' + error.toString());
            });
    }

    DeleteBrand(event) {
        event.preventDefault();
        var brandId = parseInt(event.target.value);

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://localhost:5001/api/Product/DeleteBrand/' + brandId, requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.status === true) {
                    for (var i in this.state.brands) {
                        if (this.state.brands[i].id === brandId) {
                            this.state.brands.splice(i, 1);
                            this.setState({ brands: this.state.brands });
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
                <h3 className='mx-2'>Brand List</h3>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Company Name</th>
                                <th>Brand Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.brands.map((x, i) => {
                                    return (
                                        <tr>
                                            <td>{x.id}</td>
                                            <td>{x.company.companyName}</td>
                                            <td>{x.brandName}</td>
                                            <td width='20%'>
                                                <Link to={`/editbrand/${x.id}`} >
                                                    <button className="btn btn-primary mr-1">Edit</button>
                                                </Link>
                                                <button onClick={this.DeleteBrand}
                                                    value={x.id} className="btn btn-danger">Delete</button>
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
