// A pool slot keeps its world anchor until it is recycled behind the camera.
export function sceneryAnchor(slot,count,distance,spacing,behind=2){
 const first=Math.floor(distance/spacing)-behind;
 return (first+((slot-first)%count+count)%count)*spacing;
}
