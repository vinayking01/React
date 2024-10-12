import { useEffect, useState } from 'react'
import UseCurrencyInfo from './custom_hooks/useCurrency'
import InputBox from './components/Input'

function App() {
  const [amount, setAmount] = useState(0) // Initial amount
  const [from, setFrom] = useState('usd')   // From this currency
  const [to, setTo] = useState('inr')       // convert in this currency
  const [convertedAmount, setConvertedAmount] = useState(0);   // Converted amount which means result

  const currencyInfo = UseCurrencyInfo(from)  // All the changing currency with value is fetch from API
  const options = Object.keys(currencyInfo)   //  extracted all the keys from the API 
  // console.log(options)


  const swap = (event) => {
    event.preventDefault() // always use to prevent the default behavior of the form submission
    // Swap the 'from' and 'to' currencies
    setTo(from);
    setFrom(to);
    setConvertedAmount(amount);
    setAmount(convertedAmount);

  }

  function convert() {
    console.log("amount - into ", amount, to)
    setConvertedAmount(amount * currencyInfo[to])
  }


  return (
    <div className='w-full  bg-cover bg-center bg-no-repeat overflow-hidden'
      style={{  backgroundImage: `url(./piggy.jpeg)`,  width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
  
        }}>
      <h1 className='text-center font-semibold text-6xl pt-3 text-cyan-50 text-'>Currency Converter</h1>
      <div className='flex justify-center items-center '>
        <div className='flex-2 w-1/3 flex flex-col justify-center items-center p-7'>
          <video autoPlay muted loop className="w-full h-screen">
            <source src="src\assets\money.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
        </div>

        <div className=' flex flex-1 justify-center items-center w-full h-screen'>
          <div className=' max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
            <form onSubmit={(e) => {
              e.preventDefault(); // Prevent page refresh on form submission
              convert();
            }}>
              <div className='w-full mb-1'>

                {/* First input box for source currency */}
                <InputBox label="from" amount={amount} currencyOptions={options} onCurrencyChange={(currency) => setFrom(currency)} onAmountChange={(amount) => setAmount(amount)} selectedCurrency={from} />
              </div>
              <div className='relative w-full h-0.5'>

                {/* Swap button */}
                <button className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5' onClick={swap}>
                  Swap
                </button>
              </div>

              {/* 'To' input box */}
              <div className='w-full mb-1'>
                <InputBox label="to" currencyOptions={options} amount={convertedAmount} onCurrencyChange={(currency) => setTo(currency)} selectedCurrency={to} amountDisabled />
              </div>

              {/* Convert button */}
              <button type='submit' className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;