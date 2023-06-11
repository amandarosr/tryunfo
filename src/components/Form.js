import { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';

class Form extends Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2,
      cardAttr3, cardImage, cardRare, cardTrunfo, hasTrunfo,
      isSaveButtonDisabled, onInputChange, onSaveButtonClick, handleSubmit } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <fieldset>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              data-testid="name-input"
              id="name"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="describe">
            Descrição
            <textarea
              data-testid="description-input"
              id="describe"
              name="cardDescription"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="attr1">
            Attr1
            <input
              type="number"
              data-testid="attr1-input"
              id="attr1"
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr2">
            Attr2
            <input
              type="number"
              data-testid="attr2-input"
              id="attr2"
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr3">
            Attr3
            <input
              type="number"
              data-testid="attr3-input"
              id="attr3"
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="image">
            Imagem
            <input
              type="text"
              data-testid="image-input"
              id="image"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="rarity">
            Raridade
            <select
              data-testid="rare-input"
              id="rarity"
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          <label htmlFor="checkbox">
            { !hasTrunfo ? <input
              type="checkbox"
              data-testid="trunfo-input"
              id="checkbox"
              name="cardTrunfo"
              checked={ cardTrunfo }
              onChange={ onInputChange }
            /> : <span>Você já tem um Super Trunfo em seu baralho</span> }
            Super Trybe Tryunfo
          </label>
        </fieldset>
        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
