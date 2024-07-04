import React from 'react'
import AccountSection from './AccountSection'
import Breadcrumb from './Breadcrumb'

const Account = () => {
  return (
    <div>
         <Breadcrumb
                pageTitle="Account"
                pageName="Account"
            />
      <AccountSection/>

    </div>
  )
}

export default Account
