// Native lazy loading can fetch an entire horizontal collection several screens ahead.
// Decode only nearby visible cards; keep full-size selected artwork separate.
const observers=new WeakMap();
export function loadNearbyCardImages(root){
 observers.get(root)?.disconnect();
 const images=[...root.querySelectorAll('img[data-card-src]')];
 const load=img=>{img.decoding='async';img.src=img.dataset.cardSrc;delete img.dataset.cardSrc;};
 if(!('IntersectionObserver' in window)){images.forEach(load);return;}
 const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){load(entry.target);observer.unobserve(entry.target);}},{root,rootMargin:'0px 120px',threshold:.01});
 observers.set(root,observer);images.forEach(img=>observer.observe(img));
}
