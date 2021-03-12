import React, { Component } from 'react';

export class InsertProduct extends Component {
    constructor(props) {
        super(props);

        this.state = { brands: [], companies: [] }

        this.SubmitInsertProduct = this.SubmitInsertProduct.bind(this);
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
    }

    onChangeLoadBrand(event) {
        fetch('https://localhost:5001/api/Product/GetBrandsByCompanyId/' + event.target.value)
            .then(x => x.json())
            .then(x => {
                this.setState({ brands: x });
            })
    }

    SubmitInsertProduct(event) {
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
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                brandId: this.selectBrand.value,
                name: this.inputName.value,
                amount: this.inputAmount.value,
                price: this.inputPrice.value,
            })
        };

        fetch('https://localhost:5001/api/Product/InsertProduct', requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === true)
                    alert('New Product Submitted successfully');
                else
                    alert('Something went wrong!' + res.error);

                this.inputName.value = '';
                this.inputAmount.value = '';
                this.inputPrice.value = '';
                //this.brandInput.focus();
            })
            .catch(error => {
                alert(error.toString());
            });

    }

    render() {
        return (
            <div className='container'>
                <h1>Insert Product</h1>
                <form onSubmit={this.SubmitInsertProduct}>
                    <div className="form-group">
                        <label>Select Company:</label>
                        <select className="form-control" ref={selectComp => this.selectComp = selectComp } onChange={this.onChangeLoadBrand}>
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
                            <option value=''>-- Select brand --</option>
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

                    <button type="submit" className="btn btn-success mt-2">Add Product</button>
                </form>
            </div>
        );
    }
}
