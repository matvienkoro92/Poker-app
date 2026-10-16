// Materials can be arrays on multi-surface bodywork, including hidden variants.
// Render targets and environment targets remain owned by their renderer caller.
export function disposeSceneResources(scene){
 const geometries=new Set(),materials=new Set(),textures=new Set();
 const collect=value=>{if(Array.isArray(value))value.forEach(collect);else if(value?.isMaterial)materials.add(value);};
 scene.traverse(object=>{
  if(object.geometry)geometries.add(object.geometry);
  collect(object.material);collect(object.customDepthMaterial);collect(object.customDistanceMaterial);
 });
 for(const material of materials){for(const value of Object.values(material))if(value?.isTexture)textures.add(value);material.dispose();}
 textures.forEach(texture=>texture.dispose());geometries.forEach(geometry=>geometry.dispose());
}
