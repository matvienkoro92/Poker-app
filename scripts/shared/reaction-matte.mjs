// Key only the backdrop connected to the edges, preserving grey details inside
// the character. Reuse buffers and calculate colour distance once per pixel.
export function createReactionMatte(width,height){
 const size=width*height,mask=new Uint8Array(size),alpha=new Uint8Array(size),queue=new Int32Array(size);
 return function matte(pixels,background){
  const a=pixels.data;let head=0,tail=0;
  for(let p=0,i=0;p<size;p++,i+=4){const delta=Math.max(Math.abs(a[i]-background),Math.abs(a[i+1]-background),Math.abs(a[i+2]-background));mask[p]=delta<26?1:0;alpha[p]=delta<26?Math.round(a[i+3]*Math.max(0,(delta-12)/14)):255;}
  for(let x=0;x<width;x++){const bottom=(height-1)*width+x;if(mask[x]===1){mask[x]=2;queue[tail++]=x;}if(mask[bottom]===1){mask[bottom]=2;queue[tail++]=bottom;}}
  for(let y=1;y<height-1;y++){const left=y*width,right=left+width-1;if(mask[left]===1){mask[left]=2;queue[tail++]=left;}if(mask[right]===1){mask[right]=2;queue[tail++]=right;}}
  while(head<tail){const p=queue[head++],x=p%width;a[p*4+3]=alpha[p];if(x>0&&mask[p-1]===1){mask[p-1]=2;queue[tail++]=p-1;}if(x+1<width&&mask[p+1]===1){mask[p+1]=2;queue[tail++]=p+1;}if(p>=width&&mask[p-width]===1){mask[p-width]=2;queue[tail++]=p-width;}if(p+width<size&&mask[p+width]===1){mask[p+width]=2;queue[tail++]=p+width;}}
  return pixels;
 };
}
