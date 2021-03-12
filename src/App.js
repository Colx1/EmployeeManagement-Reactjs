import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { Insert } from './components/Insert/Insert';
import { InsertCompany } from './components/Insert/InsertCompany';
import { InsertBrand } from './components/Insert/InsertBrand';
import { InsertProduct } from './components/Insert/InsertProduct';

import { EditCompany } from './components/Edit/EditCompany';
import { EditBrand } from './components/Edit/EditBrand';
import { EditProduct } from './components/Edit/EditProduct';

import { List } from './components/List/List';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/insert' component={Insert} />
        <Route path='/insertcompany' component={InsertCompany} />
        <Route path='/insertbrand' component={InsertBrand} />
        <Route path='/insertproduct' component={InsertProduct} />

        <Route path='/list' component={List} />

        <Route path='/editcompany/:id' component={EditCompany} />
        <Route path='/editbrand/:id' component={EditBrand} />
        <Route path='/editproduct/:id' component={EditProduct} />

      </Layout>
    );
  }
}
