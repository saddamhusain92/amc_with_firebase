import React, { useEffect, useState } from 'react'
import { auth, db } from '../../firebase/config'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import Loading from '../../components/Loading'
import { CheckBadgeIcon,  } from '@heroicons/react/24/outline'
function KycPage() {
  const authid = auth.currentUser
  const initialState = {
    userid:authid.uid,
    fullname: "",
    aadharcard: "",
    pancard: "",
    accout_no: "",
    ifsccode: "",
    branch: "",
    bank_name: "",
    upi_id: ""
  }
  const [state, setState] = useState(initialState)
  const[kyc,setKyc] = useState(false)
  const[loading,setLoading] = useState(true)
  const inputHandler = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const formSubmit = async(e) => {
  e.preventDefault();
  try {
    await setDoc(doc(db, "userkyc",authid.uid), state)
  } catch (error) {
    
  }
  }
const kyupdate = async()=>{
  const q = query(collection(db,"userkyc"), where("userid", "==", authid.uid))
  const querySnapshot = await getDocs(q);
   const data =  querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
   if(data.length>0){
    setKyc(true)
   }
}

 useEffect(()=>{
  kyupdate()
const load = setInterval(()=>{
  setLoading(!loading)
},1000)
return ()=>clearInterval(load)
},[])
  return (
    <div>
      {loading?<><Loading type={"cubes"} color={"green"}/></>:<>
      
      {kyc?<>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          
          <h1 className="mt-4 text-xl font-bold tracking-tight text-green-600 sm:text-xl">KYC is Updated</h1>
          <p className="mt-2 text-sm leading-7 text-gray-600"> In case of any change in KYC details, Call a change request  the supporting helpline No 0000000000</p>
          <div className="mt-5 flex items-center justify-center gap-x-6">
            <div
              href="#"
              className="h-5 rounded-full flex items-center justify-center w-5 bg-green-600"
            >
           <CheckBadgeIcon className='h-5 w-5 text-white'/>
            </div>
          
          </div>
        </div>
      </main>
   
      </>:<>
      
      <div className='m-auto px-10'>

      <form onSubmit={formSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="full-name">
              Full Name
            </label>
            <input name='fullname' onChange={inputHandler} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="full-name" type="text" placeholder="John Doe" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="aadhaar-number">
              Aadhaar Number
            </label>
            <input name='aadharcard' onChange={inputHandler} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="aadhaar-number" type="text" placeholder="1234-5678-9012" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pan-card">
              PAN Card
            </label>
            <input name='pancard' onChange={inputHandler} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="pan-card" type="text" placeholder="ABCDE1234F" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="account-number">
              Account Number
            </label>
            <input name='accout_no' onChange={inputHandler} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="account-number" type="text" placeholder="1234567890" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ifsc">
              IFSC
            </label>
            <input name='ifsccode' onChange={inputHandler} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="ifsc" type="text" placeholder="ABCD0123456" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="branch">
              Branch
            </label>
            <input name='branch' onChange={inputHandler} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="branch" type="text" placeholder="XYZ Branch" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bank-name">
              Bank Name
            </label>
            <input name='bank_name' onChange={inputHandler} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="bank-name" type="text" placeholder="ABC Bank" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="upi-id">
              UPI ID
            </label>
            <input name='upi_id' onChange={inputHandler} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id='upi-id' placeholder='vikashyd@ybl' />
          </div>
        </div>
        <button
          type='submit'
          className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update KYC
        </button>
      </form>

    </div>
      </>}
      
      
      </>}
      
    </div>

  )
}

export default KycPage

 