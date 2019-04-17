# react-with-konami [![Build Status](https://travis-ci.org/moldy530/react-with-konami.svg?branch=master)](https://travis-ci.org/moldy530/react-with-konami)
React HoC to add easter egg functionality to your React components. See [react-use-konami](https://www.npmjs.com/package/react-use-konami) for a hook implementation.

## Installation
``` 
npm install --save react-with-konami
```

## Usage
```js
// EasterComponent
import React from 'react';
import withKonami from 'react-with-konami';

class EasterComponent extends React.Component {
    render(){
        const { konamiSuccess } = this.props;
        
        return (<div>{konamiSuccess ? 'EASTER YAY' : 'Hi World!'}</div>)
    }
}

/**
* 
* Resulting wrapped component also accepts the optional properties:
* {
*     code: string[],
*     resetOnSuccess: boolean
* }
* 
*/
export default withKonami(EasterComponent);
```

### `code`
An array of strings equal to the sequence of `key` fired on `keyup`. The default is:
```
['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter']
```

### `resetOnSuccess`
boolean value that controls whether the `konamiSuccess` props passed to the Wrapped Component
should reset after successful input. The default value for this is `false`. If you set it to `true`,
you can use `componentDidUpdate` or `useEffect` to act on the successful input.
