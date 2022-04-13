import React from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';
import { BsFacebook,BsSearch } from "react-icons/bs";
import { AiFillTwitterCircle,AiFillInstagram } from "react-icons/ai";
import { MdLocationOn,MdCall,MdEmail } from "react-icons/md";




const Footer = () => {
    return (
        <footer className='mt-5 footer'>
            <div className='footer-bg-one'>
            <div className="container text-white">
                <div className="row">
                    <div className="col-md-3 ">
                        <h4>Contact</h4>
                        <p><MdLocationOn className='contact-icon'/> Chandpur, Chittagong, <br/> Bangladesh</p>
                        <p><MdCall className='contact-icon'/> 01836883501</p>
                        <p><MdEmail className='contact-icon'/> alam.diu13@gmail.com</p>
                    </div>
                    <div className="col-md-3">
                        <h4>Quick Links</h4>
                        <p className="font-weight-bold">
                            <Link to="/" className="text-link">Home</Link> <br/>
                            <Link to="/shop" className="text-link">Shop</Link> <br/>    
                            <Link to="/admin" className="text-link">Admin</Link>          
                        </p>
                    </div>
                    <div className="col-md-3">
                    <h4>We Provide</h4>
                        <p className="font-weight-bold">
                            <Link to="/shop" className="text-link">Chicken Eggs</Link> <br/>   
                            <Link to="/shop" className="text-link">Duck Eggs</Link> <br/>         
                            <Link to="/shop" className="text-link">Quail Eggs</Link> <br/>         
                            <Link to="/shop" className="text-link">Ostrich Eggs</Link> <br/>   
                        </p>
                    </div><div className="col-md-3">
                        <h4>Working Hours</h4>
                        <ul class="working-hours">
							<li><span>Monday</span> : 8AM - 6AM</li>
							<li><span>Tuesday</span> : 8AM - 6AM</li>
							<li><span>Wednesday</span> : 8AM - 6AM</li>
							<li><span>Thursday - Friday </span> : 8AM - 6AM</li>
							<li><span>Sunday</span> : Closed</li>
						</ul>
                    </div>
                </div>
            </div>
            </div>
            
            
            <div className="text-center footer-bg-two">
                <ul className="social-media list-inline">
                    <li className="list-inline-item"><Link to="//facebook.com" target='_blanc'><BsFacebook className="icon"/></Link></li>
                    <li className="list-inline-item"><Link to="//twitter.com" target='_blanc'><AiFillTwitterCircle className="icon" /></Link></li>
                    <li className="list-inline-item"><Link to="//instagram.com" target='_blanc'><AiFillInstagram className="icon" /></Link></li>
                </ul>
                <p className="text-white">&copy; {(new Date()).getFullYear()} All Rights Reserved | Designed and developed by <a href='https://github.com/mdmahbubulalam' target='_blank' className='text-decoration-none text-color'>Mohammad Mahbubul Alam</a></p>
            </div>
        </footer>
    );
};

export default Footer;