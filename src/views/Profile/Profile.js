import { useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import { auth, db } from '../../firebase/config'
import { doc, getDoc,addDoc, collection ,updateDoc} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function UserProfile() {
  const authid = auth.currentUser

  const [user, setUser] = useState()


  const getuser = async () => {
    const docRef = doc(db, "Users", authid.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setUser(docSnap.data())

    }

  }
  useEffect(() => {
    if (authid) {
      getuser()
    }
  },[])
  if (user) {
    return (
      <>
      <ToastContainer/>
        {/* Main */}
        <div className="divide-y divide-gray-200">
          <div className="pb-6">
            <div className="h-24 bg-green-700 rounded-lg sm:h-20 lg:h-28" />
            <div className="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16">
              <div>
                <div className="-m-1 flex">
                  <div className="inline-flex overflow-hidden   border-2 rounded-full  border-white">
                    <img
                      className="h-24 rounded-full w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                      src="https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:ml-6 sm:flex-1">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</h3>
                    <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                      <span className="sr-only">Online</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="mt-1 flex flex space-y-3 sm:space-x-3 sm:space-y-0">

                 
                  

                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:px-0 sm:py-0">
            <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">Bio</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                  <p>
                    Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. Gravida in tempus
                    feugiat netus enim aliquet a, quam scelerisque. Dictumst in convallis nec in bibendum
                    aenean arcu.
                  </p>
                </dd>
              </div>
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  Label
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                  {user.label}
                </dd>
              </div>
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  Wallet
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                  {user.wallet}
                </dd>
              </div>
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  Sponsor ID
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                  {user.sponsor}
                </dd>
              </div>
              <div className="sm:flex sm:px-6 sm:py-5">
                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                  Share Refcode
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                  <time dateTime="1982-06-23">{user.merefcode}</time>
                </dd>
              </div>
            </dl>
          </div>
        </div>

      </>
    )
  }
  else {
    return <Loading type={"cubes"} color={"green"}/>
  }
}

export default UserProfile