import React, { Component } from 'react';

export class EditCompany extends Component {
    constructor(props) {
        super(props);

        this.state = { companyId: this.props.match.params.id }

        this.SubmitUpdateCompany = this.SubmitUpdateCompany.bind(this);

        fetch('https://localhost:5001/api/Product/GetCompanies/' + this.state.companyId)
            .then(x => x.json()).then(x => {
                this.companyInput.value = x.companyName;
            })
    }

    SubmitUpdateCompany(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.companyId,
                companyName: this.companyInput.value
            })
        };

        fetch('https://localhost:5001/api/Product/UpdateCompany/' + this.state.companyId, requestOptions)
            .then(response => response.json())
            .then(res => {
                if (res.status === true)
                    alert('Updated successfully');
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
                <h1>Edit Company</h1>
                <form onSubmit={this.SubmitUpdateCompany}>
                    <div className="form-group">
                        <label>Company Name:</label>
                        <input type="text" className="form-control" ref={companyInput => this.companyInput = companyInput} />
                    </div>

                    <button type="submit" className="btn btn-primary mt-2">Update Company</button>
                </form >
            </div >
        );
    }
}
