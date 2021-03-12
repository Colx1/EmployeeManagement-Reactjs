import React, { Component } from 'react';

export class EditBrand extends Component {
    constructor(props) {
        super(props);

        this.state = { brandId: this.props.match.params.id, companies: [] }

        this.SubmitUpdateBrand = this.SubmitUpdateBrand.bind(this);

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('https://localhost:5001/api/Product/GetCompanies', requestOptions)
            .then(x => x.json())
            .then(x => {
                //console.log(x);
                this.setState({ companies: x })

                fetch('https://localhost:5001/api/Product/GetBrands/true/' + this.state.brandId)
                    .then(x => x.json()).then(x => {
                        this.selectInput.value = x.companyId;
                        this.brandInput.value = x.brandName;

                    })
            })
            .catch(error => {
                alert('Fetching Selectbox: ' + error.toString());
            });

        
    }

    SubmitUpdateBrand(event) {
        event.preventDefault();

        if (this.selectInput.value === '') {
            alert('Select company first!')
            return;
        }

        if (this.brandInput.value === '') {
            alert('Enter the name first!')
            return;
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.brandId,
                companyId: this.selectInput.value,
                brandName: this.brandInput.value
            })
        };

        fetch('https://localhost:5001/api/Product/UpdateBrand/' + this.state.brandId, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === true)
                    alert('Brand Updated successfully');
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
                <h1>Edit Brand</h1>
                <form onSubmit={this.SubmitUpdateBrand}>
                    <div className="form-group">
                        <label>Select Company:</label>
                        <select className="form-control" ref={selectInput => this.selectInput = selectInput}>
                            <option value="">-- Select company --</option>
                            {
                                this.state.companies.map((x, i) => {
                                    return (<option key={i} value={x.id}>{x.companyName}</option>)
                                })
                            }
                        </select>
                    </div >

                    <div className="form-group">
                        <label>Brand Name:</label>
                        <input type="text" className="form-control" ref={brandInput => this.brandInput = brandInput} />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Update Brand</button>
                </form >
            </div>
        );
    }
}
