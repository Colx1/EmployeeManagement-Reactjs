import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Insert extends Component {

    render() {
        return (
            <div>
                <h1>Insert Section</h1>
                <Link to='/InsertCompany' style={{ marginRight: '5px' }} className='btn btn-primary'>Insert Company</Link>
                <Link to='/InsertBrand' style={{ marginRight: '5px' }} className='btn btn-primary'>Insert Brand</Link>
                <Link to='/InsertProduct' className='btn btn-primary'>Insert Product</Link>

            </div>
        );
    }
}
