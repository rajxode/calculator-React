
// importing useState hook from react
import { useState } from 'react';

// importing css styles 
import styles from '../Styles/controls.module.css';

// Importing button component to add buttons to the contoller
import ControlButton from './ControlButton';


// an array containing the whole layout of buttons so that we can map over the array to create the whole layout 
const operators = ['AC','C','%','/',
                    '7','8','9','*',
                    '4','5','6','-',
                    '1','2','3','+',
                    '0','.','='];


// component to render the whole control bar of the calculator
const Controls = (props) => {

    // getting state and methods from the props
    const {input, setInput, setOutput} = props;

    // to know if a operational symbol is clicked or not 
    const [isSymbolClick , setIsSymbolClick] = useState(false);


    // handle the clicks on differnet buttons in calculator's controller
    const handleClick = (value) => {

        // switch case for differnt symbol cases
        switch(value){

            // when user click on All clear button remove all data 
            case 'AC':
                setInput('0');
                setOutput(0);
                break;
            
            // when user click on Clear button remove the last entered value
            case 'C':
                if(input.length === 1){
                    setInput('0')
                    setOutput(0);
                    break;
                }
                setInput(input.slice(0,input.length-1));
                break;
            

            // when user click on percentage button show the percentage
            case '%':
                // for storing the answer
                var answer;
                // if the input already contains a operator
                if(isSymbolClick){
                    // remove the operator form input
                    const newInput = input.slice(0,input.length-1);
                    // find the percentage of new input
                    answer = eval(`${newInput} / 100`);
                }
                // if input contains no operator
                else{
                    answer = eval(`${input} / 100`);
                }
                
                // store the answer in input(string) for further calculation 
                setInput(answer.toString());
                
                // store all value in output to show the answer on output screen
                setOutput(answer);
                
                // false to isSymbolClick so that we can add further operations in input
                setIsSymbolClick(false);
                break;
            

            // when user click on equal sign
            case '=':
                // if no values given after selecting mathematical operator
                if(isSymbolClick){
                    window.alert('Please Enter Correct value');
                    break;
                }

                // else find the answer 
                var result = eval(input);
                var stringResult =result.toString();

                // if answer's length is greater than 12 then convert into exponential
                if(stringResult.length > 12){
                    result=(result).toExponential(2);
                }

                // store the output in state and show on screen
                setInput(result.toString());
                setOutput(result);
                break;


            // when user click on divide
            case '/':
                
                // if user click on divide when Input is '0' append the symbol to input
                if( input === '0'){
                    setIsSymbolClick(true);
                    setInput( input + value);
                    break;
                }

                // if input string already contains a symbol at the end, 
                // change the operator with divide
                if(isSymbolClick){
                    const newInput = input.slice(0,input.length-1)
                    setInput(newInput + value);
                    break;
                }
                // else
                // set isSymbolClick to true
                setIsSymbolClick(true);


            
            // if user select the multiply operation
            case '*':
                // if input is '0' append the operator at end of the input string
                if( input === '0'){
                    // set isSymbolClick to true
                    setIsSymbolClick(true);
                    setInput( input + value);
                    break;
                }
                // if there is already a operator at the end of input string 
                // then exchange the symbol with multiply sign
                if(isSymbolClick){
                    const newInput = input.slice(0,input.length-1)
                    setInput(newInput + value);
                    break;
                }
                // set isSymbolClick to true
                setIsSymbolClick(true);


            // when user select the '+' operator
            case '+':
                // if input is '0' append the operator at end of input string
                if( input === '0'){
                    // set symbolClick to true
                    setIsSymbolClick(true);
                    setInput( input + value);
                    break;
                }
                // if there is already a symbol at last of string 
                // exchange the operator with '+'
                if(isSymbolClick){
                    const newInput = input.slice(0,input.length-1)
                    setInput(newInput + value);
                    break;
                }
                // set symbolClick to true
                setIsSymbolClick(true);


            
            // when user's select the '-' operator 
            case '-':
                // if input is '0' then append the operator at end of input string
                if( input === '0'){
                    // set symbolClicked true
                    setIsSymbolClick(true);
                    setInput( input + value);
                    break;
                }
                // if there is already a symbol at the end of input string
                // exchange the symbol with '-'
                if(isSymbolClick){
                    const newInput = input.slice(0,input.length-1)
                    setInput(newInput + value);
                    break;
                }
                // set symbolClick to true
                setIsSymbolClick(true);


            // default case when any number is clicked
            default:
                if(input === '0'){
                    // if input is '0'
                    // replace the input with entered number
                    setInput(value.toString());
                    break;
                }
                
                // else
                // append the entered digit at last of input string
                setInput(input + value);

                // if there was a symbol at the end of the input string 
                if(isSymbolClick){
                    // set is to false
                    // because now we added a number at the end of input string 
                    setIsSymbolClick(false);
                }
                break;
        }
    }


    // return the whole controls section of calculator
    return(
        // control container
        <div className={styles.controlContainer}>

            {/* mapping over operator array to add all the buttons */}
            {/* calling <ControlButton /> component for each operator to add a button */}
            {/* passing operator values and handleclick function to button from props */}
            {operators.map((value,i) => <ControlButton key={i}
                                                        index={i}
                                                        value={value}
                                                        handleClick={handleClick} />)}
        </div>
    );
}

// export the controls
export default Controls;