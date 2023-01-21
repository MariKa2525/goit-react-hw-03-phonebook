import React, { Component } from 'react';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    const { contacts } = this.state;

    const dublicate = contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
    );

    if (dublicate) {
      return alert(`${data.name} is already in contacts`);
    }

    data.id = nanoid();

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, data],
      };
    });
  };

  changeFilterValue = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} changeFilterValue={this.changeFilterValue} />
        <ContactList contacts={this.getContacts()} deleteContact={this.deleteContact} /> 
                
      </div>
    );
  }
}
