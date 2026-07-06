// ===============================
// WHACK-A-PEST
// MAIN JAVASCRIPT
// ===============================

// Current year in footer
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// Smooth scrolling

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// Header shadow on scroll

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        header.style.boxShadow="0 12px 30px rgba(0,0,0,.15)";

    }else{

        header.style.boxShadow="0 5px 18px rgba(0,0,0,.08)";

    }

});

// Reveal animation

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

document.querySelectorAll("section,.service-card,.split-card,.step,.faq-item").forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});

// WhatsApp tracking

const whatsappLinks=document.querySelectorAll('a[href*="wa.me"]');

whatsappLinks.forEach(link=>{

link.addEventListener("click",()=>{

console.log("WhatsApp clicked");

});

});

// Phone tracking

const phoneLinks=document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link=>{

link.addEventListener("click",()=>{

console.log("Phone clicked");

});

});

// Email tracking

const emailLinks=document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link=>{

link.addEventListener("click",()=>{

console.log("Email clicked");

});

});

// Fade in animation support

const style=document.createElement("style");

style.innerHTML=`

.hidden{

opacity:0;

transform:translateY(40px);

transition:all .7s ease;

}

.show{

opacity:1;

transform:translateY(0);

}

`;

document.head.appendChild(style);
