import React from 'react';
import { Link } from 'react-router-dom';

const AddBtn = () => {
    return (
        <Link to={'/new'} className='btn default'>
            Добавить объявление
        </Link>
    );
};

const AddAdvBtn = () => (
    <form className="navbar-form navbar-center">
        <AddBtn />
    </form>
);

export default AddAdvBtn;