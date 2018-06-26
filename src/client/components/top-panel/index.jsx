import React from 'react';

import  Logo from './logo';
import  LineLink from './line-link-btn';
import  VkLink from './vk-link-btn';
import  SearchForm from './search-form';
import  AddAdvBtn from './add-btn';
import  MobileMenuBtn from './mobile-menu-btn';

const TopPanel = () => {
    return (
        <nav className='navbar navbar-default navbar-fixed-top'>
            <div className="container-fluid">
                <div className="navbar-header">
                    <MobileMenuBtn />
                    <Logo />
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><LineLink /></li>
                        <li><VkLink /></li>
                    </ul>
                    <SearchForm />
                    <AddAdvBtn /> 
                </div>
            </div>
        </nav>
    );
};

export { TopPanel }; 