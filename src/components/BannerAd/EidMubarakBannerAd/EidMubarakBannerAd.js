import React, { useEffect } from 'react';
import './EidMubarakBannerAd.css'
import { gsap } from "gsap";

const EidMubarakBannerAd = () => {
    useEffect(()=>{
        const timeline = gsap.timeline( {defaults:{duration:1, opacity: 0 }})
        timeline
        .from('.text1', {y:100, delay:1})

        const textTwo = document.querySelector('.text2');
        const textTwoLetter = textTwo.textContent.split("")
        
        textTwo.textContent=""

        textTwoLetter.forEach((letter)=> {
            textTwo.innerHTML +=`<span class="textTwoLetter">${letter}</span>`
        })

        gsap.set(".textTwoLetter",{display: "inline-block"})
        gsap.fromTo(".textTwoLetter", {y: 50}, {y:0, delay:2, duration:1, stagger:0.3, repeat:-1, ease:"back.out"});
  
    },[])

    
    return (
        <div className="container pt-5">
       <div className="banner">
           <div className="content">
               <div>
                    <h4 className="text1">EID</h4>
                    <h5 className="text2" id="text2">Mubarak</h5>
                </div>
           </div>
            
       </div>
    </div>
    );
};

export default EidMubarakBannerAd;