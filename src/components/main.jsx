import React from 'react';
import ContactList from './contact-list';
import { Header } from './header';
export const Main = () => {
    return (
        <div className="container">
            <Header />
            <ContactList />
        </div>
    )
}