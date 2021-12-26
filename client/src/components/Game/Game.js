import './Game.css';
import { useEffect, useState } from 'react';

function Game() {
  const tests = [
    {
      emodji: '🍎',
      answer: 'apple'
    }, {
      emodji: '⚽',
      answer: 'ball'
    }, {
      emodji: '🦴',
      answer: 'bone'
    }, {
      emodji: '🥒',
      answer: 'cucumber'
    }, {
      emodji: '🚁',
      answer: 'helicopter'
    }, {
      emodji: '⭐',
      answer: 'star'
    }, {
      emodji: '🥄',
      answer: 'spoon'
    }, {
      emodji: '🧠',
      answer: 'brain'
    }, {
      emodji: '🍯',
      answer: 'honey'
    }, {
      emodji: '🧣',
      answer: 'scarf'
    }, {
      emodji: '🍅',
      answer: 'tomato'
    }, {
      emodji: '🥕',
      answer: 'carrot'
    }, {
      emodji: '🧅',
      answer: 'onion'
    }, {
      emodji: '🧄',
      answer: 'garlic'
    }, {
      emodji: '🌽',
      answer: 'corn'
    }, {
      emodji: '👂',
      answer: 'ear'
    }, {
      emodji: '🌂',
      answer: 'umbrella'
    }, {
      emodji: '📏',
      answer: 'ruler'
    }, {
      emodji: '🚀',
      answer: 'rocket'
    }, {
      emodji: '🍌',
      answer: 'banana'
    }, {
      emodji: '👃',
      answer: 'nose'
    }, {
      emodji: '🦷',
      answer: 'tooth'
    }, {
      emodji: '🪓',
      answer: 'axe'
    }, {
      emodji: '🪑',
      answer: 'chair'
    }, {
      emodji: '🔪',
      answer: 'knife'
    }, {
      emodji: '🚪',
      answer: 'door'
    }, {
      emodji: '🧲',
      answer: 'magnet'
    }, {
      emodji: '💿',
      answer: 'disk'
    }, {
      emodji: '🎈',
      answer: 'balloon'
    }, {
      emodji: '🌋',
      answer: 'volcano'
    }, {
      emodji: '🎸',
      answer: 'guitar'
    }, {
      emodji: '🍫',
      answer: 'chocolate'
    }, {
      emodji: '🥔',
      answer: 'potato'
    }, {
      emodji: '🍞',
      answer: 'bread'
    }, {
      emodji: '🍓',
      answer: 'strawberry'
    }, {
      emodji: '🧈',
      answer: 'butter'
    }, {
      emodji: '🎂',
      answer: 'cake'
    }, {
      emodji: '📰',
      answer: 'newspaper'
    }
  ]

  let currentTestIndex = Math.floor(Math.random()*tests.length);
  const [currentTest, setCurTest] = useState(tests[currentTestIndex])

  let tasksListElement = null;
  useEffect(() => {
    tasksListElement = document.querySelector(`.tasks__list`);

    const tasksListDragOver = (evt) => {
      evt.preventDefault();
      const activeElement = tasksListElement.querySelector(`.selectedx`);
      const currentElement = evt.target;
      const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`tasks__item`);

      if (!isMoveable) {
        return;
      }

      const nextElement = getNextElement(evt.clientY, currentElement);

      if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
      ) {
        return;
      }

      tasksListElement.insertBefore(activeElement, nextElement);
    }
    tasksListElement.addEventListener('dragover', tasksListDragOver)
  }, [currentTest])

  const tasksListDragStart = (evt) => {
    evt.target.classList.add(`selectedx`);
  }

  const tasksListDragEnd = (evt) => {
    evt.target.classList.remove(`selectedx`);
    let result = ''
    for (let one of tasksListElement.childNodes) {
      result += one.innerText
    }
    if (result.toLowerCase() === currentTest.answer.toLowerCase()) {
      let nextTestIndex = Math.floor(Math.random()*tests.length);
      while (nextTestIndex === currentTestIndex) {
        nextTestIndex = Math.floor(Math.random()*tests.length);
      }
      setCurTest(tests[nextTestIndex])
    }
  }

  const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

    return nextElement;
  };

  function shuffle(array) {
    const clone = array.slice()
    clone.sort(() => Math.random() - 0.5);
    console.log(clone.join(''));
    console.log(array.join(''));
    while (clone.join('') === array.join('')) {
      clone.sort(() => Math.random() - 0.5);
    }
    return clone;
  }

  return (
    <div className="App">
      <div className="containerx">
        <section className="tasks">
          <span className="tasks__title" >{currentTest.emodji}</span>

          <ul className="tasks__list" onDragStart={tasksListDragStart} onDragEnd={tasksListDragEnd}>
            {shuffle(currentTest.answer.split('')).map((letter) => {
              return <li className="tasks__item" draggable>{letter.toUpperCase()}</li>
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Game;
