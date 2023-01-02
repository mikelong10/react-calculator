import { useState } from "react"
import Input from "./components/Input"
const math = require('mathjs')

export default function Calc() {
  const [clearStatus, setClearStatus] = useState('AC')
  const [prevOutput, setPrevOutput] = useState('')
  const [curOutput, setCurOutput] = useState('')

  function clear(clearStatus) {
    if (clearStatus === 'AC') {
      setPrevOutput('')
      setCurOutput('')
    } else {
      setClearStatus('AC')
      setCurOutput('')
    }
  }

  function enterNumber(value) {
    let newCurOutput
    if (!(curOutput.includes('.') && value === '.')) {
      setClearStatus('C')
      newCurOutput = curOutput + value
      if (newCurOutput === '.') {
        newCurOutput = '0.'
      }
      if (newCurOutput.length > 1 && newCurOutput.substring(0, 1) === '0' && value !== '.' && newCurOutput.substring(0, 2) !== '0.') {
        newCurOutput = newCurOutput.substring(1)
      }
    }
    if (newCurOutput.length > 9) {
      setCurOutput(newCurOutput.substring(0, 9))
    } else {
      setCurOutput(newCurOutput)
    }
  }

  function doOperation(operation) {
    if (curOutput) {
      setPrevOutput(curOutput.concat(' ', operation))
      setCurOutput('')
    }
  }

  function evaluate() {
    if (prevOutput && curOutput) {
      const expression = prevOutput.concat(' ', curOutput).split(' ')
      setPrevOutput('')
      // actually do the math
      const [firstVal, operation, secondVal] = expression
      doMath(firstVal, operation, secondVal)
    }
  }

  // to toggle the sign (positive/negative) of the current number
  function toggleSign() {
    if (curOutput) setCurOutput(math.multiply(Number(curOutput), -1).toString())
  }

  // calculate percentage version of the current output
  function percentize() {
    if (curOutput) doMath(curOutput, '/', '100')
  }

  function doMath(firstVal, operation, secondVal) {
    let evaluation
    if (operation === '+') {
      evaluation = math.add(Number(firstVal), Number(secondVal))
    } else if (operation === '–' || operation === '-') {
      evaluation = math.subtract(Number(firstVal), Number(secondVal))
    } else if (operation === 'x' || operation === '*') {
      evaluation = math.multiply(Number(firstVal), Number(secondVal))
    } else if (operation === '÷' || operation === '/') {
      evaluation = math.divide(Number(firstVal), Number(secondVal))
    }
    const answer = evaluation.toString()
    if (answer.includes('.') && (answer.split('.')[1].substring(0, 6) === '999999')) {
      setCurOutput(Math.round(evaluation).toString())
    } else if (answer.length > 9) {
      setCurOutput(answer.substring(0, 9))
    } else {
      setCurOutput(answer)
    }
  }

  return (
    <div className="calc">
      <div className="output">
        <div className="prev">{prevOutput}</div>
        <div className="current">{curOutput}</div>
      </div>
      <div className="inputs">
        <div className="left">
          <div className="misc">
            <Input value={clearStatus} onClick={() => clear(clearStatus)} />
            <Input value={'±'} onClick={toggleSign} />
            <Input value={'%'} onClick={percentize} />
          </div>
          <div className="numbers">
            <div className="row">
              <Input value={7} inputType={'digit'} onClick={() => enterNumber('7')} />
              <Input value={8} inputType={'digit'} onClick={() => enterNumber('8')} />
              <Input value={9} inputType={'digit'} onClick={() => enterNumber('9')} />
            </div>
            <div className="row">
              <Input value={4} inputType={'digit'} onClick={() => enterNumber('4')} />
              <Input value={5} inputType={'digit'} onClick={() => enterNumber('5')} />
              <Input value={6} inputType={'digit'} onClick={() => enterNumber('6')} />
            </div>
            <div className="row">
              <Input value={1} inputType={'digit'} onClick={() => enterNumber('1')} />
              <Input value={2} inputType={'digit'} onClick={() => enterNumber('2')} />
              <Input value={3} inputType={'digit'} onClick={() => enterNumber('3')} />
            </div>
            <div className="row">
              <Input value={0} inputType={'digit'} onClick={() => enterNumber('0')} />
              <Input value={'.'} inputType={'decimal'} onClick={() => enterNumber('.')} />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="operations">
            <Input value={'÷'} inputType={'operation'} onClick={() => doOperation('÷')} />
            <Input value={'x'} inputType={'operation'} onClick={() => doOperation('x')} />
            <Input value={'–'} inputType={'operation'} onClick={() => doOperation('–')} />
            <Input value={'+'} inputType={'operation'} onClick={() => doOperation('+')} />
            <Input value={'='} inputType={'operation'} onClick={evaluate} />
          </div>
        </div>
      </div>
    </div>
  )
}
