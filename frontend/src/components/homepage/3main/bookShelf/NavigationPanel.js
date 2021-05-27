import React, { Component } from 'react';
import '../main.css';
import PopularBy from './PopularBy';
import NavBar from './NavBar';

class NavigationPanel extends Component {
    onCategorySelect = (category) =>{
        this.props.onCategoryChange(category);
    }
    render() {
        return (
            <div className='NavigationPanel' >
                { /* <PopularBy></PopularBy> */}
                <NavBar onCategorySelect={this.onCategorySelect}
                    activeCatId={this.props.activeCatId} >
                </NavBar>
            </div>
        );
    }
}

export default NavigationPanel;
