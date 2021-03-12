import React, { Component } from 'react';

export class InsertCompany extends Component {
    constructor(props) {
        super(props);

        this.SubmitInsertCompany = this.SubmitInsertCompany.bind(this);
    }

    SubmitInsertCompany(event) {
        event.preventDefault();
        //console.log(this.companyInput.value);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyName: this.companyInput.value })
        };

        fetch('https://localhost:5001/api/Product/InsertCompany', requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === true)
                    alert('Submitted successfully');
                else
                    alert('Something went wrong!' + res.error);

                this.companyInput.value = '';
                this.companyInput.focus();
            })
            .catch(error => {
                alert(error.toString());
            });

    }

    render() {
        return (
            <div className='container'>
                <h1>Insert Company</h1>
                <form onSubmit={this.SubmitInsertCompany}>
                    <div className="form-group">
                        <label>Company Name:</label>
                        <input type="text" className="form-control" ref={companyInput => this.companyInput = companyInput} />
                    </div>

                    <button type="submit" className="btn btn-success mt-2">Add Company</button>
                </form >
            </div >
        );
    }
}
