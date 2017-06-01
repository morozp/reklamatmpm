const react  = require('react');
import react from 'react';
import {Link} from 'react-router';

export default () => {
    return (
        <Link to={'#'} className='btn default'>
            Добавить объявление
        </Link>
    );
};
