import React from 'react';
import countImage1 from '../images/counter-bg.png'
import { counterThreeContents } from '../utils/mockdata';
import CounterThreeItem from './CounterThreeItem';
const CounterThree = () => {
    return (
        <>
            <section className="counter-three py-[120px]">
                <img src={countImage1} alt="" className="counter-three__bg"/>
                <div className="container container-two">
                    <div className="counter-three-wrapper">
                        {
                            counterThreeContents.map((counterThreeItem, counterThreeItemIndex) => {
                                return (
                                    <CounterThreeItem counterThreeItem={counterThreeItem} key={counterThreeItemIndex}/>
                                )
                            })
                        }

                    </div>
                </div>
            </section>      
        </>
    );
};

export default CounterThree;