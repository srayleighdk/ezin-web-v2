import React, { Component } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import PageBanner from '../../components/Common/PageBanner';
import Footer from '../../components/Layouts/Footer';
import { getPageContents } from '../api';

export async function getStaticProps({params}) {
    const res = await getPageContents(params.key);
    return {
        props : {
            data: res?.data?.data
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: {key : 'dieu-khoan'}},
            { params: {key : 'chinh-sach-bao-mat'}},
            { params: {key : 'chinh-sach-thanh-toan'}},
            { params: {key : 'chinh-sach-giao-hang'}},
            { params: {key : 'chinh-sach-doi-tra'}},
        ],
        fallback: false
    };
}

const TermsConditions = ({data}) => {
        return (
            <>
                <Navbar />
                
                <PageBanner 
                    pageTitle="Terms & Conditions" 
                    homePageUrl="/" 
                    homePageText="Home" 
                    activePageText="Terms & Conditions" 
                /> 
 
                <div className="text-container ptb-100">
                    <div className="container">
                        <h3>{data.name}</h3>
             
                        
                    </div>
                </div>
              
                <Footer />
            </>
        );
    
}

export default TermsConditions;