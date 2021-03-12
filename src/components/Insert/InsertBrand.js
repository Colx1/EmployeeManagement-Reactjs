import React, { Component } from 'react';

export class InsertBrand extends Component {
    constructor(props) {
        super(props);

        this.state = { companies: [] }

        this.SubmitInsertBrand = this.SubmitInsertBrand.bind(this);
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

    SubmitInsertBrand(event) {
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
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                companyId: this.selectInput.value,
                brandName: this.brandInput.value
            })
        };

        fetch('https://localhost:5001/api/Product/InsertBrand', requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === true)
                    alert('New Brand Submitted successfully');
                else
                    alert('Something went wrong!' + res.error);

                this.selectInput.value = '';
                this.brandInput.value = '';
                //this.brandInput.focus();
            })
            .catch(error => {
                alert(error.toString());
            });

    }

    render() {
        return (
            <div className='container'>
                <h1>Insert Brand</h1>
                <form onSubmit={this.SubmitInsertBrand}>
                    <div className="form-group">
                        <label>Select Company:</label>
                        <select className="form-control" ref={selectInput => this.selectInput = selectInput } >
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

                    <button type="submit" className="btn btn-success mt-2">Add Brand</button>
                </form >
            </div>
        );
    }
}
