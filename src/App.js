// import Header from "./header"; 
import Footer from "./footer"; 
import { useEffect,  useState } from "react";
import { getURL, getNextPrice,updateURLtoBC } from './Web3Client';
import Popup from './Popup';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon
} from '@heroicons/react/outline'
import logo from "./logo.png";

export default function App() {
	const [URL, setURL] = useState(0);
  const [inputURL, setInputURL] = useState(0);
  const [NextPrice, setNextPrice] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const [showWorking, setShowWorking] = useState(false);

	const fetchURL = () => {
		getURL()
			.then((url) => {
				setURL(url);
        console.log("URL: ", url);
			})
			.catch((err) => {
				console.log(err);
			});
	};

  const fetchNextPrice = () => {
		getNextPrice()
			.then((np) => {
				setNextPrice(np * 1.21);
        console.log("Next Price: ", np);
			})
			.catch((err) => {
				console.log(err);
			});
	};
  const updateURL = (url, value) => {
		updateURLtoBC(url, value);
	};

  fetchURL();

  fetchNextPrice();


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-16 w-auto sm:h-10"
                src={logo}
                alt=""
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">

          <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 '
                    )}
                  >
                    <span onClick={() => setShowAbout(!showAbout)}>About</span>
                    
                  </Popover.Button>

                </>
              )}
            </Popover>


            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 '
                    )}
                  >
                    <span onClick={() => setShowWorking(!showWorking)}>How this works?</span>
                    
                  </Popover.Button>

                </>
              )}
            </Popover>

          </Popover.Group>
        
        </div>
      </div>
     
    </Popover>

    {/* <p>Your balance is {URL}</p> */}
			{/* <button onClick={() => fetchURL()}>Refresh balance</button> */}
  
<br/>
    <Popup visible={showAbout}/>

    <Popup visible={showWorking}/>


      <section className="text-center px-3 sm:px-12 md:px-28">
              <div className="rounded-xl shadow-xl shadow-gray-300 overflow-hidden">
                <img class="w-full" src={URL} />
              </div>
            </section>
            <center> <br/><br/>
            <div class="bg-blue-100 border-blue-500 text-blue-600 p-1" role="alert">
      <center><p>Next price: {NextPrice.toFixed(2)} ETH</p></center>
    </div>
   
        <div class="flex box-border h-16 w-80 p-4">
         <label class="relative block">
            
            <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Enter URL" type="text" name="search" onChange={e => setInputURL(e.target.value)} />
          </label>
          <div class="mx-3"> 
          <button class="bg-blue-300 hover:bg-blue-400 text-white py-2 px-3 rounded-xl" onClick={() => updateURL(inputURL, NextPrice)}>
              Change
            </button>
            </div>
        </div>
        </center>
    <Footer/>
   
    </>
  )
}