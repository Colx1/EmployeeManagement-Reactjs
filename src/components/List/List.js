import React, { Component } from 'react';
import { ListBrand } from './ListBrand';
import { ListCompany } from './ListCompany';
import { ListProduct } from './ListProduct';

export class List extends Component {
    render() {
        return (
            <div>
                <h1>List Section</h1>

                <ListCompany />
                <ListBrand />
                <ListProduct />

            </div>
        );
    }
}
