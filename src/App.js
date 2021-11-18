import React from 'react';
import './App.css';
import {createStore, combineReducers} from 'redux';
import {connect} from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { findByLabelText } from '@testing-library/dom';




/////////Redux
const allQuotes = [
  {
    author: 'Winston Churchhill',
    quote: "Success is not final; failure is not fatal: It is the courage to continue that counts."
  },
  {
    author: 'Herman Melville',
    quote: "It is better to fail in originality than to succeed in imitation."
  },
  {
    author: 'Colin R. Davis',
    quote: "The road to success and the road to failure are almost exactly the same."
  },
  {
    author: 'Henry David Thoreau',
    quote: "Success usually comes to those who are too busy to be looking for it."
  },
  {
    author: 'Chris Grosser',
    quote: "Opportunities don't happen. You create them."
  },
  {
    author: 'John D. Rockefeller',
    quote: "Don't be afraid to give up the good to go for the great."
  },
  {
    author: 'Thomas Jefferson',
    quote: "I find that the harder I work, the more luck I seem to have."
  },
  {
    author: 'James Bond',
    quote: "Vodka Martini, shaken not stirred."
  },
  {
    author: 'Ray Goforth',
    quote: "There are two types of people who will tell you that you cannot make a difference in this world: those who are afraid to try and those who are afraid you will succeed."
  },
  {
    author: 'Jim Rohn',
    quote: "Successful people do what unsuccessful people are not willing to do. Don't wish it were easier; wish you were better."
  }
];

let backgroundStyle = [
  {background: 'darkgray'},
  {background: 'darkgreen'},
  {background: 'darkmagenta'},
  {background: 'darkred'},
  {background: 'darkorange'},
  {background: 'darkcyan'},
  {background: 'darkolivegreen'},
  {background: 'darkslateblue'},
  {background: 'darkgoldenrod'},
  {background: 'darkblue'},
]
const colorMap = backgroundStyle.map(col => col.background);
const authMap = allQuotes.map(auth => auth.author);
const quoteMap = allQuotes.map(quo => quo.quote);
const index = Math.floor(Math.random() * 10);
const authAnswer = authMap[index];
const quoAnswer = quoteMap[index];
const colAnswer = colorMap[index]

const NEW_QUOTE = 'NEW_QUOTE';

const newQuote = () => {
  return {
    type: NEW_QUOTE,
    randomIndex: Math.floor(Math.random() * 10)
  };
}

const colorReducer = (state = colAnswer, action) => {
  switch(action.type) {
    case NEW_QUOTE:
      let colorArray = colorMap;
      return colorArray[action.randomIndex];
    default:
      return state;
  }
}
const quoteReducer = (state = quoAnswer, action) => {
  switch(action.type) {
    case NEW_QUOTE:
      let quoteArray = quoteMap;
      return quoteArray[action.randomIndex];
    default:
      return state;
  }
}

const authorReducer = (state = authAnswer, action) => {
  switch(action.type) {
    case NEW_QUOTE:
      let authorArray = authMap;
      return authorArray[action.randomIndex];
    default:
      return state;
  }
}
const indexReducer = (state = index, action) => {
  switch(action.type) {
    case NEW_QUOTE:
      return action.randomIndex;
    default:
      return state;
  }
}
/*const allReducers = function () {
  return [
    {quote: quoteReducer},
    {author: authorReducer},
    {index: indexReducer}
  ]
};*/

const rootReducer = combineReducers({
  quotes: quoteReducer,
  authors: authorReducer,
  colors: colorReducer
})
export const store = createStore(rootReducer);



////////React


class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.dispatch({
      type: NEW_QUOTE,
      quote: this.props.quote,
      author: this.props.author,
      color: this.props.color,
      randomIndex: Math.floor(Math.random() * 10)
    })
  }
  render() {
    const backgroundStyle = {
      height: '100vh',
      display: "flex",
      flexDirection: 'row',
      justifyItems: 'center',
      alignItems: 'center',
      margin: 'auto',
      background: this.props.color
    }
    const boxStyle = {
      width: '31%',
      padding: '3rem',
      backgroundColor: 'white',
      borderRadius: '5px',
      margin: '0 auto'
    }
    const quoteStyle = {
      fontSize: '2em',
      fontWeight: '400',
      margin: '0 auto',
      textAlign: 'center',
      color: this.props.color
    }
    const authorStyle = {
      fontWeight: '200',
      margin: '1rem 0 2rem 0',
      textAlign: 'right',
      fontSize: '1.2em',
      color: this.props.color
    }
    const buttonStyle = {
      margin: '0',
      padding: '0.7rem 1rem',
      borderRadius: '3px',
      backgroundColor: this.props.color,
      color: 'white',
      outline: 'none',
      border: 'none',
      boxSizing: 'border-box'
    }
    const socialButtonStyle = {
      margin: '0 5px 0 0',
      padding: '0.7rem 1rem',
      borderRadius: '3px',
      backgroundColor: this.props.color,
      color: 'white',
      outline: 'none',
      border: 'none',
      boxSizing: 'border-box'
    }
    const buttonDiv = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      background: ''
    }
    // <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>
    return (
      <div style={backgroundStyle}>
        <div id="quote-box" style={boxStyle}>
          <h1 id="text" style={quoteStyle}><FontAwesomeIcon icon={faQuoteLeft} style={{marginRight: '15px'}}></FontAwesomeIcon>{this.props.quote}</h1>
          <p id="author" style={authorStyle}>- {this.props.author}</p>
          <div style={buttonDiv}>
            <div>
              <button style={socialButtonStyle}>
                <a id="tweet-quote" href={`http://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${this.props.quote}%0A-%20${this.props.author}`} target="_blank"><FontAwesomeIcon icon={faTwitter} style={{color: 'white', margin: 0}}></FontAwesomeIcon>
                </a>
              </button>
              <button style={socialButtonStyle}>
                <a id="tumblr-quote" href={`https://www.google.com/search?q=${this.props.author}`} target="_blank"><FontAwesomeIcon icon={faGoogle} style={{color: 'white', margin: 0}}></FontAwesomeIcon>
                </a>
              </button>
            </div>
            <button onClick={this.handleClick} id="new-quote" style={buttonStyle}>New Quote</button>
          </div>
        </div>
      </div>
    )
  }
}

///////////React-Redux
const mapStateToProps = (state) => {
  return {
    quote: state.quotes,
    author: state.authors,
    color: state.colors
  }
}

const mapDispatcbToProps = (dispatch) => ({
  newQuote: () => dispatch(newQuote())
})

const App = connect(mapStateToProps, null)(Presentational);
export default App;

