import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import referralCodeGenerator from 'referral-code-generator'
import { amcspnid } from '../../Utils'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { doc, setDoc ,addDoc, query, where, collection, getDocs} from 'firebase/firestore'
import { auth, db} from '../../firebase/config'

function Register() {
  const referral = referralCodeGenerator.alphaNumeric('uppercase', 3, 2)
  const intialState = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    refcode: "",
    merefcode: referral,
    sponsor: amcspnid(),
    label: "BD",
    team: "",
    wallet: 0,
    widrawal: 0,
    plan: "",
    profile_avatar: ""
  }
const[userid,setUserid]=useState("")
const[teamData,setTeamData] = useState({
  uid:userid,
  side:"",
  sponsor:""
})
  const [state, setState] = useState(intialState)

  const inputHandler = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  const temHandler=(e)=>{
    const { name, value } = e.target
    setTeamData({ ...teamData, [name]: value })
  }
  const validatorForm = () => {
    if (!state?.name || !state?.mobile || !state?.email || !state?.password) {
      return false;
    }
    else {
      return true
    }
  }
  const formSubmit = async (e) => {
    e.preventDefault();
    if(validatorForm()) {
        await createUserWithEmailAndPassword(auth, state.email, state.password).then(async(u)=>{
        await setDoc(doc(db, "Users",u.user.uid), state)
        await setDoc(doc(db, "referalcode", u.user.uid),{uid:u.user.uid,rcode:state.merefcode});
        toast.success("You are successfully Accout registered")
        setState(intialState)
        setUserid(u.user.uid);
      })
   
    }
    else {
      toast.error("Please fill all fields");
    }
  }
const refcodeApply = async()=>{
const q = query(collection(db,"referalcode"), where("rcode", "==", state.refcode))
    const querySnapshot = await getDocs(q);
   const data =  querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
   if(data.length!=0){
    setState({...state,wallet:50})
   }
   else{
    alert('Refferel not code is here')
   } 
}

const addTeam = async()=>{
  try {
    await addDoc(collection(db, "teamroot"),teamData);
    setUserid("")
  } catch (error) {
   console.log(error); 
  }
}

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-20 w-auto"
            src={logo}
            alt="abhilasha"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Abhilasha Marketing company Pvt. Ltd.
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={formSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    value={state.name}
                    type="text"
                    onChange={(e) => inputHandler(e)}
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                  Mobile
                </label>
                <div className="mt-2">
                  <input
                    id="mobile"
                    name="mobile"
                    value={state.mobile}
                    onChange={inputHandler}
                    type="text"
                    autoComplete="mobile"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={state.email}
                    onChange={inputHandler}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={state.password}
                    onChange={inputHandler}
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="referral" className="block text-sm font-medium leading-6 text-gray-900">
                  referral code
                </label>
                <div className="mt-2">
                  <input
                    id="referral"
                    name="refcode"
                    value={state.refcode}
                    onChange={inputHandler}
                    type="text"

                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              
              <button
              type='button'
              className='flex justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
               onClick={()=>refcodeApply()}
               >
                {state.wallet!=0?"Code Applyed":"Apply"}
                
              </button>

            
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Register
                </button>
              </div>
            </form>
            {userid?<div className="flex justify-start gap-4 mb-3 mt-4">
                <div>
                <input
                    name="sponsor"
                    onChange={temHandler}
                    type="text"
                    placeholder='Sponsor ID'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                <select
                            id="country"
                            name="side"
                            onChange={temHandler}
                            autoComplete="side"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option value={""}>select</option>
                            <option value={"L"}>left</option>
                            <option value={"R"}>right</option>
                          </select>
                </div>
                <div>
                  
               <button
               onClick={addTeam}
                  className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
               >
                +Team
               </button>
                </div>

              </div>:""}
            

          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account Login?{' '}
            <NavLink to={"/login"} className="font-semibold leading-6 text-green-600 hover:text-green-500">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register