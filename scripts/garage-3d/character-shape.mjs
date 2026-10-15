const bell=(v,c,w)=>Math.exp(-(((v-c)/w)**2));
export function characterShape(body='bodyNormal'){
 const values={bodyNormal:[1,1,1,0],bodySlim:[.78,.78,.76,0],bodyAthletic:[1.13,1.18,1.18,0],bodyBeast:[1.31,1.4,1.5,0],bodyBelly:[1.08,1.13,1.08,.22]};
 const [width,depth,muscle,belly]=values[body]||values.bodyNormal;
 return (x,y,z,surface)=>{
  if(surface===1){const chest=bell(y,.25,.12),abdomen=bell(y,.405,.085);x*=1+(width-1)*(.55+.45*chest)+belly*abdomen;z*=depth;z+=belly*abdomen*(z>0?1:.15);}
  if(surface===2){const strength=(muscle-1)*bell(y,.29,.13);const center=Math.sign(x)*(.49+(y-.20)*1.05);x=center+(x-center)*(1+strength);z*=1+strength;}
  if(surface===4){const center=y<.55?0:Math.sign(x)*(.27+(y-.55)*.48);const strength=y<.55?(width-1)*.5:(muscle-1)*.40*bell(y,.69,.16);x=center+(x-center)*(1+strength);z*=1+strength;}
  return [x,y,z];
 };
}
