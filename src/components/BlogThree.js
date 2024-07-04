import React from 'react';
import { blogs } from '../utils/mockdata';
import BlogItemThree from './BlogItemThree';
import SectionHeading from './SectionHeading';

const BlogThree = () => {
    return (
        <>
            {/* ================================ Blog Three Start ============================    */}
            <section className="blog py-[120px] bg-[#F7F7F7]">
                <div className="container container-two">

                    <SectionHeading
                        headingClass="style-center"  
                        subtitle="Latest blog and news"
                        subtitleClass="bg-white" 
                        title="Investing in estate made lot easy" 
                        renderDesc={false}
                        desc="Real estate is a lucrative industry that involves the buying selling and renting of properties. It encompasses residential commercial and industrial properties Real estate agents play a crucial role in facilitating real estate"
                        renderButton={false}
                        buttonClass="btn-main"
                        buttonText="View More"
                    />

                    <div className="row gy-4">
                        {
                            blogs?.slice(0,3).map((blogItem, blogIndex) => {
                                return (
                                    <div className="col-lg-4 col-sm-6" key={blogIndex}>
                                        <BlogItemThree blogItem={blogItem}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            {/* ================================ Blog Three End ============================    */}
        </>
    );
};

export default BlogThree;