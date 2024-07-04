import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { accountTabs } from '../utils/mockdata';
import { useNavigate } from 'react-router-dom';
import AccountHomeTab from './AccountHomeTab';
import AccountProfileTab from './AccountProfileTab';
import AccountDetailsTab from './AccountDetailsTab';
import { ToastContainer, toast } from 'react-toastify';
import UserDetails from './UserDetails';
import Listing from './ListingProperties/Listing';
import AccountAddProperty from './AccountAddProperty';
import AccountMyPropertyTab from './AccountMyPropertyTab';
const AccountSection = () => {

    const navigate = useNavigate(); 

    const notify = () => toast.success("You have been logged out", {
        theme: "colored", 
    })

    const handleRedirectLogin = () => {
        navigate('/login');
    }
    
    return (
        <>
            <ToastContainer />
            <section className="account pt-[60px] pb-[120px]">
                <div className="container container-two">
                    <Tabs>
                        <div className="row gy-4">
                            <div className="col-xl-3 col-lg-4">
                                <div className="account-sidebar search-sidebar shadow-lg">
                                    <TabList className="nav side-tab flex-column nav-pills me-3">
                                        {
                                            accountTabs.map((accountTab, accountTabIndex) => {
                                                return (
                                                    <Tab className={'nav-link'} key={accountTabIndex}>
                                                        <span className="icon">{accountTab.icon}</span>
                                                        {accountTab.text}
                                                    </Tab>
                                                )
                                            })
                                        }
                                        {/* <button type='button' className="nav-link" onClick={()=>{notify(); handleRedirectLogin();}}> 
                                            <span className="icon"> <i className="fas fa-sign-out-alt"></i></span>  
                                            Logout
                                        </button> */}
                                    </TabList>
                                </div>
                            </div>

                            <div className="col-xl-9 col-lg-8">
                                <TabPanel>
                                    <AccountHomeTab/>
                                </TabPanel>
                                <TabPanel>
                                    <AccountProfileTab/>
                                </TabPanel>
                                {/* <TabPanel>
                                    <AccountAddressTab/>
                                </TabPanel> */}
                                <TabPanel>
                                    <UserDetails/>
                                </TabPanel>
                                <TabPanel>
                                   <Listing/>
                                </TabPanel>
                                <TabPanel>
                                <AccountAddProperty/>
                                </TabPanel>
                               
                               
                            </div>
                        </div>
                    </Tabs>
                </div>
            </section>
        </>
    );
};

export default AccountSection;