import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class ListProduct extends Component {
    constructor(props) {
        super(props);

        this.state = { products: [] }

        this.DeleteProduct = this.DeleteProduct.bind(this);
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('https://localhost:5001/api/Product/GetProducts/true', requestOptions)
            .then(x => x.json())
            .then(x => {
                //console.log(x);
                this.setState({ products: x })
            })
            .catch(error => {
                alert('Fetching Selectbox: ' + error.toString());
            });
    }

    DeleteProduct(event) {
        event.preventDefault();
        var productId = parseInt(event.target.value);

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://localhost:5001/api/Product/DeleteProduct/' + productId, requestOptions)
            .then(res => res.json())
            .then(res => {
                if (res.status === true) {
                    for (var i in this.state.products) {
                        if (this.state.products[i].id === productId) {
                            this.state.products.splice(i, 1);
                            this.setState({ products: this.state.products });
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
                <h3 className='mx-2'>Product List</h3>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Company Name</th>
                                <th>Brand Name</th>
                                <th>Product Name</th>
                                <th>Amout</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map((x, i) => {
                                    return (
                                        <tr>
                                            <td>{x.id}</td>
                                            <td>{x.brand.company.companyName}</td>
                                            <td>{x.brand.brandName}</td>
                                            <td>{x.name}</td>
                                            <td>{x.amount}</td>
                                            <td>{x.price}</td>
                                            <td width='20%'>
                                                <Link to={`/editproduct/${x.id}`} >
                                                    <button className="btn btn-primary mr-1">Edit</button>
                                                </Link>
                                                <button onClick={this.DeleteProduct} value={x.id}
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
