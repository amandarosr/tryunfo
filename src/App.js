import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: 0,
    cardAttr2: 0,
    cardAttr3: 0,
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cardList: '',
    nameFilter: '',
    rarityFilter: 'todas',
    superFilter: false,
  };

  resetForm = () => {
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    });
  };

  validateSaveBtn = () => {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare } = this.state;
    const cardTotal = parseFloat(cardAttr1) + parseFloat(cardAttr2)
    + parseFloat(cardAttr3);
    const maxTotal = 210;
    const maxAttr = 90;
    const atr1 = parseFloat(cardAttr1);
    const atr2 = parseFloat(cardAttr2);
    const atr3 = parseFloat(cardAttr3);
    const validCases = [cardName.length, cardDescription.length, cardImage.length,
      atr1 > 0, atr1 <= maxAttr, atr2 > 0, atr2 <= maxAttr, atr3 > 0, atr3 <= maxAttr,
      cardTotal <= maxTotal, cardRare.length];
    const formReady = validCases.every((err) => err);
    this.setState({
      isSaveButtonDisabled: !formReady,
    });
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validateSaveBtn);
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  saveBtnClick = () => {
    const { cardName, cardDescription, cardImage, cardAttr1, cardAttr2,
      cardAttr3, cardRare, cardTrunfo } = this.state;

    const newItem = {
      cardName,
      cardDescription,
      cardImage,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
    };

    this.setState((estadoAnterior) => ({
      cardList: [...estadoAnterior.cardList, newItem],
    }), this.handleTrunfo);
    this.resetForm();
  };

  handleTrunfo = () => {
    const { cardList, hasTrunfo } = this.state;
    const checkTrunfo = cardList.some((trunfo) => trunfo.cardTrunfo === true);
    if (checkTrunfo) {
      this.setState({
        hasTrunfo: !hasTrunfo,
      });
    }
  };

  clickDelete = (event) => {
    const { cardList } = this.state;
    const cardName = event.target.previousSibling.firstChild.innerHTML;
    if (cardList.length === 1) {
      this.setState({
        cardList: '',
      });
    } else {
      this.setState(() => ({
        cardList: cardList.filter((card) => card.cardName !== cardName),
      }));
    }
    this.handleTrunfo();
  };

  resetFilters = () => {
    this.setState({
      nameFilter: '',
      rarityFilter: 'todas',
    });
  };

  filterByName = ({ target }) => {
    const { name, value } = target;
    const { cardList } = this.state;
    if (value.length) {
      this.setState({
        [name]: value,
        cardList: cardList.filter((n) => n.cardName.includes(value)),
      }, this.handleTrunfo);
    }
  };

  filterByRarity = ({ target }) => {
    const { name, value } = target;
    const { cardList } = this.state;
    if (value !== 'todas') {
      this.setState({
        [name]: value,
        cardList: cardList.filter((r) => r.cardRare === value),
      }, this.handleTrunfo);
    }
  };

  filterBySuper = ({ target }) => {
    this.resetFilters();
    const { name, checked } = target;
    const { cardList } = this.state;
    this.setState({
      [name]: checked,
      cardList: cardList.filter((s) => s.cardTrunfo === true),
    }, this.handleTrunfo);
  };

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      cardList, nameFilter, rarityFilter, superFilter } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.saveBtnClick }
          handleSubmit={ this.handleSubmit }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <div>
          <h3>Filtros:</h3>
          <input
            type="text"
            name="nameFilter"
            data-testid="name-filter"
            placeholder="Filtrar por nome"
            value={ nameFilter }
            onChange={ this.filterByName }
            disabled={ !!superFilter }
          />
          <select
            name="rarityFilter"
            data-testid="rare-filter"
            value={ rarityFilter }
            onChange={ this.filterByRarity }
            disabled={ !!superFilter }
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
          <label htmlFor="super-filter">
            <input
              type="checkbox"
              name="superFilter"
              data-testid="trunfo-filter"
              id="super-filter"
              checked={ superFilter }
              onChange={ this.filterBySuper }
            />
            Super Trunfo
          </label>
        </div>
        { cardList.length ? cardList.map((card, index) => (
          <div key={ `0${index}` }>
            <Card
              key={ index }
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardAttr1={ card.cardAttr1 }
              cardAttr2={ card.cardAttr2 }
              cardAttr3={ card.cardAttr3 }
              cardImage={ card.cardImage }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
            />
            <button
              key={ `K${index}` }
              type="button"
              data-testid="delete-button"
              onClick={ this.clickDelete }
            >
              Excluir
            </button>
          </div>
        )) : <div /> }
      </div>
    );
  }
}

export default App;
