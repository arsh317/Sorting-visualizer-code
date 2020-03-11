import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getHeapSortAnimations} from '../sortingAlgorithms/heapSort.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/quickSort.js';
import {getBubbleSortAnimations} from '../sortingAlgorithms/bubbleSort.js';
import './SortingVisualizer.css';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 80;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
const THIRD_COLOR = 'pink';
const FOURTH_COLOR = 'blue';

var bar_width=20;
const bar_margin=2;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],bar_no:160,sort_speed:5,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSpeed = this.handleSpeed.bind(this);
  }

  componentDidMount() {
    this.resetArray();
  }



  resetArray() {
    const array = [];

    var No_arr=this.state.bar_no;
    let wd=window.screen.width;
    let tot_lf= wd - (bar_margin)*(No_arr-1);
    bar_width=(0.5*tot_lf)/No_arr;
    bar_width=Math.floor(bar_width);

    //var No_arr=(0.7*(window.screen.width)*(window.devicePixelRatio))/(this.state.bar_width+2*this.state.bar_margin);
    
    //console.log(window.screen.width);
    for (let i = 0; i < No_arr; i++) {
      var ht=0.7*((window.screen.height));
      array.push(randomIntFromInterval(5, ht));
    }
    this.setState({array});

    const arrayBars = document.getElementsByClassName('array-bar');
    for (var i = 0; i < this.state.array.length; i++) {

      const barstyle=arrayBars[i].style;
      barstyle.backgroundColor=PRIMARY_COLOR;       
    }
  }

  handleChange(event) {
    //var tmp=Math.floor((parseInt(52-event.target.value)));
    this.setState({bar_no: Math.floor(parseInt(event.target.value))});
    this.resetArray();
  }

  handleSpeed(event) {
    //var tmp=Math.floor((parseInt(52-event.target.value)));
    this.setState({sort_speed: Math.floor(parseInt(51-event.target.value))});
  }

  /*AdjustArray()
  {
      var Slider = document.getElementsByClassName('slider');
      bar_width=55-Slider.value;
      console.log(bar_width);onChange={this.handleChange}
      componentDidMount();
  }*/

  mergeSort() {

    const ANIMATION_SPEED_MS = this.state.sort_speed;
    
    const animations = getMergeSortAnimations(this.state.array);
    console.log(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } 
      else 
      {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {

    const ANIMATION_SPEED_MS = this.state.sort_speed;
    
    const animations = getQuickSortAnimations(this.state.array);
    

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx,fl] = animations[i];
      
      const rem = i % 3;

      if (barOneIdx!=-1)
      {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        if(rem!=1)
        {
          if(fl==0)
          {
            const color=(rem === 0 ? SECONDARY_COLOR : PRIMARY_COLOR);
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          }
          else if(fl==1 && rem==0)
          {
            setTimeout(() => {
              barOneStyle.backgroundColor = SECONDARY_COLOR;
              barTwoStyle.backgroundColor = FOURTH_COLOR;
            }, i * ANIMATION_SPEED_MS);
          }
          else
          {
            setTimeout(() => {
              barTwoStyle.backgroundColor = PRIMARY_COLOR;
              barOneStyle.backgroundColor = FOURTH_COLOR;              
            }, i * ANIMATION_SPEED_MS);
          }
        }
        else
        {
          setTimeout(() => {
            const temp1=barOneStyle.height;
            const temp2=barTwoStyle.height;
            barOneStyle.height=temp2;
            barTwoStyle.height=temp1;
          }, i * ANIMATION_SPEED_MS);
        }      
      } 
      else
      {
        const barOneStyle = arrayBars[0].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        setTimeout(() => {
          barTwoStyle.backgroundColor = FOURTH_COLOR;
        }, Math.floor(i*(0.34) * ANIMATION_SPEED_MS) );
      } 
      
    }

  }

  heapSort() {

    const ANIMATION_SPEED_MS = this.state.sort_speed;

    const animations = getHeapSortAnimations(this.state.array);
    console.log(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];

      const rem = i % 3;

      if (barOneIdx!=-1) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        if(rem!=1)
        {
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        }else{

            setTimeout(() => {
            const temp1=barOneStyle.height;
            const temp2=barTwoStyle.height;
            barOneStyle.height=temp2;
            barTwoStyle.height=temp1;
          }, i * ANIMATION_SPEED_MS);

        }      
      } else {
        const barOneStyle = arrayBars[0].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        if(rem==0)
        {
          setTimeout(() => {
            barOneStyle.backgroundColor = THIRD_COLOR;
            barTwoStyle.backgroundColor = THIRD_COLOR;
          }, i * ANIMATION_SPEED_MS);
        }else if(rem==2){

          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = FOURTH_COLOR;
          }, i * ANIMATION_SPEED_MS);

        }else{

          setTimeout(() => {
            const temp1=barOneStyle.height;
            const temp2=barTwoStyle.height;
            barOneStyle.height=temp2;
            barTwoStyle.height=temp1;
          }, i * ANIMATION_SPEED_MS);

        } 
      
      }
    }
    
  }

  bubbleSort() {

    const ANIMATION_SPEED_MS = this.state.sort_speed;

    const animations = getBubbleSortAnimations(this.state.array);
    

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx,fl] = animations[i];
      
      const rem = i % 3;

      if (barOneIdx!=-1 && rem!=1)
      {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        const color=(rem === 0 ? SECONDARY_COLOR : PRIMARY_COLOR);
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      }
      else if(barOneIdx!=-1 )
      {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        setTimeout(() => {
            const temp1=barOneStyle.height;
            const temp2=barTwoStyle.height;
            barOneStyle.height=temp2;
            barTwoStyle.height=temp1;
        }, i * ANIMATION_SPEED_MS);
      }
      else
      {
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barTwoStyle.backgroundColor = FOURTH_COLOR;
        }, Math.floor(i * ANIMATION_SPEED_MS) );
      }
      
    }
    
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getHeapSortAnimations(array);
      console.log(arraysAreEqual(javaScriptSortedArray, array));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="main-container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Sorting-Visualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link  onClick={() => this.resetArray()} >Generate New Array</Nav.Link>
                <label className="sliderlabel">Array Length : </label>
                  <input type="range" className="slider" min="10" max="160" defaultValue="50" 
                  onChange={this.handleChange}>
                  </input>
                  <label className="sliderlabel">  Sorting Speed : </label>
                  <input type="range" className="slider" min="1" max="50" defaultValue="5" 
                  onChange={this.handleSpeed}>
                  </input>
              </Nav>
              <Nav>
                <Nav.Link onClick={() => this.mergeSort()}>Merge-Sort</Nav.Link>
                <Nav.Link onClick={() => this.heapSort()}>Heap-Sort</Nav.Link>
                <Nav.Link onClick={() => this.quickSort()}>Quick-Sort</Nav.Link>
                <Nav.Link onClick={() => this.bubbleSort()}>Bubble-Sort</Nav.Link>            
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${bar_width}px`,
              }}></div>
          ))}
          {/*<button onClick={() => this.testSortingAlgorithms()}>
            Test Sorting Algorithms (BROKEN)
          </button> */}
           
          
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}