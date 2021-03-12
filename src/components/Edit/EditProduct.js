import React, { Component } from 'react';

export class EditProduct extends Component {
    constructor(props) {
        super(props);

        this.state = { productId: this.props.match.params.id, brands: [], companies: [], selectedCompanyId: null }

        this.SubmitUpdateProduct = this.SubmitUpdateProduct.bind(this);
        this.onChangeLoadBrand = this.onChangeLoadBrand.bind(this);
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

        fetch('https://localhost:5001/api/Product/GetProducts/true/' + this.state.productId)
            .then(x => x.json()).then(x => {

                fetch('https://localhost:5001/api/Product/GetBrandsByCompanyId/' + x.brand.companyId)
                    .then(f => f.json())
                    .then(f => {
                        this.setState({ brands: f });
                        this.setState({ selectedCompanyId: x.brand.companyId });
                        //this.state.selectedCompanyId = x.brand.companyId;

                        this.selectComp.value = x.brand.companyId;
                        this.selectBrand.value = x.brandId;
                        this.inputName.value = x.name;
                        this.inputAmount.value = x.amount;
                        this.inputPrice.value = x.price;

                    })
            })
    }

    onChangeLoadBrand(event) {
        fetch('https://localhost:5001/api/Product/GetBrandsByCompanyId/' + event.target.value)
            .then(x => x.json())
            .then(x => {
                this.setState({ brands: x });
            })
    }

    SubmitUpdateProduct(event) {
        event.preventDefault();

        if (this.selectComp.value === '') {
            alert('Select company first!');
            return;
        }

        if (this.selectBrand.value === '') {
            alert('Select brand first!');
            return;
        }

        if (this.inputName.value === '' || this.inputAmount.value === '' || this.inputPrice.value === '') {
            alert('Enter input empty fields remaining');
            return;
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.productId,
                brandId: this.selectBrand.value,
                name: this.inputName.value,
                amount: this.inputAmount.value,
                price: this.inputPrice.value,
            })
        };

        fetch('https://localhost:5001/api/Product/UpdateProduct/' + this.state.productId, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === true)
                    alert('Product Updated successfully');
                else
                    alert('Something went wrong!' + res.error);
            })
            .catch(error => {
                alert(error.toString());
            });

    }

    render() {
        return (
            <div className='container'>
                <h1>Edit Product</h1>
                <form onSubmit={this.SubmitUpdateProduct}>
                    <div className="form-group">
                        <label>Select Company:</label>
                        <select className="form-control" ref={selectComp => this.selectComp = selectComp} onChange={this.onChangeLoadBrand}>
                            <option value=''>-- Select company --</option>
                            {
                                this.state.companies.map((x, i) => {
                                    return (<option key={i} value={x.id}>{x.companyName}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select Brand:</label>
                        <select className="form-control" ref={selectBrand => this.selectBrand = selectBrand}>
                            <option value=''>-- Select company --</option>
                            {
                                this.state.brands.map((x, i) => {
                                    return (<option key={i} value={x.id}>{x.brandName}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" className="form-control" ref={inputName => this.inputName = inputName} />
                    </div>
                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="text" className="form-control" ref={inputAmount => this.inputAmount = inputAmount} />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="text" className="form-control" ref={inputPrice => this.inputPrice = inputPrice} />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Update Product</button>
                </form>
            </div>
        );
    }
}
