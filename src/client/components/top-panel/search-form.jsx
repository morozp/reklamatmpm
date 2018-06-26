import React from 'react';

const SearchInput = () => (
    <input type='text' className='form-control' placeholder='Например, iPhone 7' />
);

const SearchBtn = () => (<button type='submit' className='btn btn-default'>Найти</button>);

const SearchForm = () => (
    <form className='navbar-form navbar-left' role='search'>
        <div className='form-group'>
            <SearchInput />
        </div>
        <SearchBtn />
    </form>
);

export default SearchForm;