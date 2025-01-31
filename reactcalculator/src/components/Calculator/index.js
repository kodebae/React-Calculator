import React, { useState } from 'react';
import {Container, Screen, Previous, Current, Button} from './Styled';

// The functional component for the calculator. 
// Uses React Hook 'useState' to manage the state of stored values. Values are strings so initial state is an empty string. 

export default function Calculator(){

    const [previous, setPrevious] = useState('')
    const [current, setCurrent] = useState('')
    const [operation, setOperation] = useState('')

    const appendValue = (el) => {

        const value = el.target.getAttribute('data')

        if(value === '.' && current.includes('.')) return
        setCurrent(current + value) 
        
    } // Main variables for setting/controlling state and values. Function for decimal button. Returns the value/data of buttons when pressed.


    const handleDelete = () => {

        setCurrent(String(current).slice(0, -1))

    } // Function for the delete button. Deletes elements one at a time.


    const handleAllClear = () => {
        setCurrent('')
        setPrevious('')
        setOperation('')

    } // Function to delete the entire screen with one click. This function resets all of the states back to an empty string to delete everything.


    const chooseOperation = (el) => {
        if(current === '') return
        if(previous !== ''){
            let value = compute();
            setPrevious(value)
        } else {
            setPrevious(current)
        } 

        setCurrent('')
        setOperation(el.target.getAttribute('data'))

    } // Function to choose an operation, can not choose an operation before choosing a number. Add operation to previous and current state.


    const equals = () => {
        let value = compute();
        if(value === undefined || value === null) return

            setCurrent(value)
            setPrevious('')
            setOperation('')

    } // Functionality for the 'equals' button. 



    const compute = () => {
        let result
        let previousNumber = parseFloat(previous)
        let currentNumber = parseFloat(current)

        if(isNaN(previousNumber) || isNaN(currentNumber)) return

        switch(operation){
            case '÷':
                result = previousNumber / currentNumber;
                break;
            case '×':
                result = previousNumber * currentNumber;
                break;        
            case '+':
                result = previousNumber + currentNumber;
                break;
            case '-':
                result = previousNumber - currentNumber;
                break;  
            default: 
                return      
        }

        return result;


    } // The mathmatical computation of equations. 'parseFloat' converts a string to a decimal/float number data type. Will not return anything other than a number. Has a default return for edgecases. Returns the computed result.


    return(
        <Container>
            <Screen>
                <Previous>{previous} {operation}</Previous>
                <Current>{current}</Current>
            </Screen>
            <Button onClick={handleAllClear} gridSpan={2} control>AC</Button>
            <Button onClick={handleDelete} control>DEL</Button>
            <Button data={'÷'} onClick={chooseOperation} operation>÷</Button>
            <Button data={'7'} onClick={appendValue}>7</Button>
            <Button data={'8'} onClick={appendValue}>8</Button>
            <Button data={'9'} onClick={appendValue}>9</Button>
            <Button data={'×'} onClick={chooseOperation} operation>×</Button>
            <Button data={'4'} onClick={appendValue}>4</Button>
            <Button data={'5'} onClick={appendValue}>5</Button>
            <Button data={'6'} onClick={appendValue}>6</Button>
            <Button data={'+'} onClick={chooseOperation} operation>+</Button>
            <Button data={'1'} onClick={appendValue}>1</Button>
            <Button data={'2'} onClick={appendValue}>2</Button>
            <Button data={'3'} onClick={appendValue}>3</Button>
            <Button data={'-'} onClick={chooseOperation} operation>-</Button>
            <Button data={'.'} period onClick={appendValue}>.</Button>
            <Button data={'0'} onClick={appendValue}>0</Button>
            <Button onClick={equals} gridSpan={2} equals>=</Button>
        </Container>
        
    )
}



