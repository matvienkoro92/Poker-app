// Keep the complete glazing assembly ahead of the steering wheel's swept bounds.
export function windshieldForwardOffset(wheelFront,glassRear,clearance=.18){
 return Math.max(0,wheelFront+clearance-glassRear);
}
