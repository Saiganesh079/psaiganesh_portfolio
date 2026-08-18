document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav-links");
 if(toggle&&nav) toggle.addEventListener("click",()=>nav.classList.toggle("open"));
 const els=[...document.querySelectorAll(".work-card,.intro-grid,.cap-grid a,.section-heading-row,.about-grid>*,.education-grid article,.project-story,.project-gallery,.project-footer,.coming-grid")];
 if("IntersectionObserver" in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.08});els.forEach(e=>io.observe(e));}else els.forEach(e=>e.classList.add("is-visible"));
});
// Works category switching
document.querySelectorAll(".category-tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    const category=tab.dataset.category;
    document.querySelectorAll(".category-tab").forEach(t=>t.classList.toggle("active",t===tab));
    document.querySelectorAll(".work-category-view").forEach(v=>v.classList.toggle("active",v.dataset.view===category));
    history.replaceState(null,"",`#${category}`);
    window.scrollTo({top:document.querySelector(".category-tabs").offsetTop-20,behavior:"smooth"});
  });
});
const initialCategory=location.hash.replace("#","");
if(initialCategory){
  const tab=document.querySelector(`.category-tab[data-category="${initialCategory}"]`);
  if(tab) tab.click();
}

// Landing category cards use native links; no extra animation framework is loaded.
