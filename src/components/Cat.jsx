import React, { useRef, useEffect, forwardRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Cat = forwardRef(({ animationName = "Slow", origin = [0, 0, 0], scale = 1, ...props }, ref) => {
  const group = useRef(); // local reference for the group
  const { nodes, materials, animations } = useGLTF("assets/cat_22_lowpoly_modifiers_02.glb"); // Updated to match new GLB path
  const { actions } = useAnimations(animations, group);

  // forward the ref to the parent
  useEffect(() => {
    if (ref) {
      ref.current = group.current; // link the local group ref to the forwarded ref
    }
  }, [ref]);

  // handle animations
  useEffect(() => {
    if (actions && animationName) {
      Object.values(actions).forEach((action) => action.stop());
      actions[animationName]?.reset().play();
    }
  }, [actions, animationName]);

  // traverse and update materials for flat, unshaded look
  useEffect(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if ((child.isMesh || child.isSkinnedMesh) && child.material) {
          // Clone the material to avoid modifying the original
          const originalMaterial = child.material;
          
          // Debug logging for nose
          if (child.name === "Nose") {
            console.log("Nose material:", originalMaterial);
            console.log("Nose material name:", originalMaterial.name);
            console.log("Nose material emissive:", originalMaterial.emissive);
          }
          
          // Get the color from the material - handle different material types
          let materialColor = new THREE.Color(0xffffff); // default white
          
          // Handle specific materials by name and mesh name
          if (child.name === "Body") {
            materialColor = new THREE.Color(0xff8c42); // Orange color for cat body
          } else if (child.name === "Nose") {
            materialColor = new THREE.Color(0xffc0cb); // Pink color for nose
          } else if (child.name.includes("Brow")) {
            materialColor = new THREE.Color(0xff8c42); // Orange color for brows to match OrangeStripeFlat
          } else if (originalMaterial.name === "BlackOutline" || child.name.includes("Outline")) {
            materialColor = new THREE.Color(0x000000); // Black for outlines
          } else if (originalMaterial.name === "PinkNose") {
            materialColor = new THREE.Color(0xe6567a); // Pink for nose
          } else if (originalMaterial.name === "OrangeStripeFlat" || originalMaterial.name === "OrangeBodyFlat") {
            materialColor = new THREE.Color(0xff9933); // Orange for stripes and body
          } else if (child.name === "Pot" || child.name === "PotF") {
            materialColor = new THREE.Color(0x654321); // Brown for pot
          } else if (child.name === "GroupStripesCurve121") {
            materialColor = new THREE.Color(0x000000); // Black stripes
          } else if (child.name === "GroupStripesCurve121_1") {
            materialColor = new THREE.Color(0xff8c42); // Orange stripes
          } else if (originalMaterial.emissive && originalMaterial.emissive.getHex() !== 0x000000) {
            materialColor = originalMaterial.emissive.clone(); // Use emissive color for emissive materials
          } else if (originalMaterial.color) {
            materialColor = originalMaterial.color.clone();
          } else if (originalMaterial.emissive) {
            materialColor = originalMaterial.emissive.clone();
          } else if (originalMaterial.map) {
            // If there's a texture but no color, use white as base
            materialColor = new THREE.Color(0xffffff);
          }

          // Create MeshBasicMaterial for completely flat shading
          const basicMaterial = new THREE.MeshBasicMaterial({
            color: materialColor,
            map: originalMaterial.map || null,
            transparent: originalMaterial.transparent || false,
            opacity: originalMaterial.opacity !== undefined ? originalMaterial.opacity : 1.0,
            alphaTest: originalMaterial.alphaTest || 0,
            side: originalMaterial.side || THREE.FrontSide,
          });

          child.material = basicMaterial;

          // Specific adjustments for certain meshes
          if (child.name === "Legsa" || child.name === "Legsb") {
            child.material.transparent = false;
          }

          if (child.name === "Desk") {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material.transparent = false;
          }
        }
      });
    }
  }, [materials, nodes]); // Add nodes dependency to ensure this runs after materials are loaded

  return (
    <group {...props} ref={group} dispose={null} scale={scale}>
      <group position={origin}>
        <group name="Scene">
          {/* Collar */}
          <mesh
            name="Collar"
            castShadow
            receiveShadow
            geometry={nodes.Collar.geometry}
            material={materials.Collar}
          />
          <mesh
            name="Nose"
            castShadow
            receiveShadow
            geometry={nodes.Nose.geometry}
            material={materials.PinkNose} 
            position={[0, 2.534, 0.568]}
          />
          <mesh
            name="Tag"
            castShadow
            receiveShadow
            geometry={nodes.Tag.geometry}
            material={materials.Tag}
            position={[0, 1.82, -0.005]}
          />
          <mesh
            name="Tag2"
            castShadow
            receiveShadow
            geometry={nodes.Tag2.geometry}
            material={materials["Material.001"]}
            position={[0, 1.487, 0.454]}
          />
          
          {/* Armature with all bones from new GLB */}
          <group name="Armature">
            <skinnedMesh
              name="Body"
              geometry={nodes.Body.geometry}
              material={new THREE.MeshBasicMaterial({ color: 0xff8c42 })} // force orange color
              skeleton={nodes.Body.skeleton}
              castShadow
            />
            <primitive object={nodes.Base} />
            <primitive object={nodes.Tail1} />
            <primitive object={nodes.PR} />
            <primitive object={nodes.RcontR} />
            <primitive object={nodes.PL} />
            <primitive object={nodes.LcontL} />
            <primitive object={nodes.TC} />
            <primitive object={nodes.EyeL} />
            <primitive object={nodes.EyeR} />
            <primitive object={nodes.EyeCon} />
            <primitive object={nodes.BrowL} />
            <primitive object={nodes.BrowR} />
            <primitive object={nodes.neutral_bone} />
          </group>

          <mesh
            name="Laptop"
            castShadow
            receiveShadow
            geometry={nodes.Laptop.geometry}
            material={materials["Material.006"]}
            position={[0, 1.502, 1.064]}
          />
          <mesh
            name="Screen"
            castShadow
            receiveShadow
            geometry={nodes.Screen.geometry}
            material={materials["Material.005"]}
            position={[0, 2.093, 1.708]}
          />
          <mesh
            name="Chair"
            castShadow
            receiveShadow
            geometry={nodes.Chair.geometry}
            material={materials["Material.004"]}
            position={[0, -0.165, -0.782]}
          />
          <mesh
            name="Pot"
            castShadow
            receiveShadow
            geometry={nodes.Pot.geometry}
            material={new THREE.MeshBasicMaterial({ color: 0x654321 })} // force brown color
            position={[1.937, 0, 1.081]}
          />
          <mesh
            name="Desk"
            castShadow
            receiveShadow
            geometry={nodes.Desk.geometry}
            material={materials.Material}
            position={[0, 1.402, 1.039]}
          />
          <mesh
            name="Legsa"
            castShadow
            receiveShadow
            geometry={nodes.Legsa.geometry}
            material={materials["Material.002"]}
            position={[0, 0.35, 0.243]}
          />
          <mesh
            name="Legsb"
            castShadow
            receiveShadow
            geometry={nodes.Legsb.geometry}
            material={materials["Material.003"]}
            position={[0, 0.35, 0.243]}
          />
          <mesh
            name="Mug"
            castShadow
            receiveShadow
            geometry={nodes.Mug.geometry}
            material={materials["Material.008"]}
            position={[-1.153, 1.682, 1.186]}
          />
          <mesh
            name="Mhandle"
            castShadow
            receiveShadow
            geometry={nodes.Mhandle.geometry}
            material={materials["Material.007"]}
            position={[-1.276, 1.688, 0.888]}
          />
          <mesh
            name="Soil"
            castShadow
            receiveShadow
            geometry={nodes.Soil.geometry}
            material={new THREE.MeshBasicMaterial({ color: 0x3d2914 })} // darker brown than pot
            position={[1.937, 0.643, 1.075]}
          />
          <mesh
            name="Tea"
            castShadow
            receiveShadow
            geometry={nodes.Tea.geometry}
            material={materials["Material.013"]}
            position={[-1.153, 1.798, 1.186]}
          />
          <mesh
            name="Leaf"
            castShadow
            receiveShadow
            geometry={nodes.Leaf.geometry}
            material={materials["Material.009"]}
            position={[1.934, 1.326, 1.024]}
            rotation={[-0.573, -0.191, -0.184]}
          />
          <mesh
            name="Screen001"
            castShadow
            receiveShadow
            geometry={nodes.Screen001.geometry}
            material={materials["Material.014"]}
            position={[0, 2.088, 1.658]}
          />
          <mesh
            name="Leaf001"
            castShadow
            receiveShadow
            geometry={nodes.Leaf001.geometry}
            material={materials["Material.009"]}
            position={[1.85, 1.742, 1.135]}
            rotation={[-2.553, 0.436, 2.783]}
          />
          <mesh
            name="Leaf002"
            castShadow
            receiveShadow
            geometry={nodes.Leaf002.geometry}
            material={materials["Material.009"]}
            position={[2.036, 1.314, 1.23]}
            rotation={[-2.212, -0.732, -2.228]}
          />

          {/* Updated Keys group structure from new GLB */}
          <group name="Keys" position={[0.665, 1.551, 1.275]}>
            <mesh
              name="Cube032"
              castShadow
              receiveShadow
              geometry={nodes.Cube032.geometry}
              material={materials["Material.023"]}
            />
            <mesh
              name="Cube032_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_1.geometry}
              material={materials["Material.024"]}
            />
            <mesh
              name="Cube032_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_2.geometry}
              material={materials["Material.025"]}
            />
            <mesh
              name="Cube032_3"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_3.geometry}
              material={materials["Material.026"]}
            />
            <mesh
              name="Cube032_4"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_4.geometry}
              material={materials["Material.027"]}
            />
            <mesh
              name="Cube032_5"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_5.geometry}
              material={materials["Material.028"]}
            />
            <mesh
              name="Cube032_6"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_6.geometry}
              material={materials["Material.029"]}
            />
            <mesh
              name="Cube032_7"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_7.geometry}
              material={materials["Material.030"]}
            />
            <mesh
              name="Cube032_8"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_8.geometry}
              material={materials["Material.031"]}
            />
            <mesh
              name="Cube032_9"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_9.geometry}
              material={materials["Material.032"]}
            />
            <mesh
              name="Cube032_10"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_10.geometry}
              material={materials["Material.033"]}
            />
            <mesh
              name="Cube032_11"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_11.geometry}
              material={materials["Material.034"]}
            />
            <mesh
              name="Cube032_12"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_12.geometry}
              material={materials["Material.035"]}
            />
            <mesh
              name="Cube032_13"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_13.geometry}
              material={materials["Material.036"]}
            />
            <mesh
              name="Cube032_14"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_14.geometry}
              material={materials["Material.037"]}
            />
            <mesh
              name="Cube032_15"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_15.geometry}
              material={materials["Material.038"]}
            />
            <mesh
              name="Cube032_16"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_16.geometry}
              material={materials["Material.039"]}
            />
            <mesh
              name="Cube032_17"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_17.geometry}
              material={materials["Material.040"]}
            />
            <mesh
              name="Cube032_18"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_18.geometry}
              material={materials["Material.041"]}
            />
            <mesh
              name="Cube032_19"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_19.geometry}
              material={materials["Material.042"]}
            />
            <mesh
              name="Cube032_20"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_20.geometry}
              material={materials["Material.043"]}
            />
            <mesh
              name="Cube032_21"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_21.geometry}
              material={materials["Material.044"]}
            />
            <mesh
              name="Cube032_22"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_22.geometry}
              material={materials["Material.045"]}
            />
            <mesh
              name="Cube032_23"
              castShadow
              receiveShadow
              geometry={nodes.Cube032_23.geometry}
              material={materials["Material.046"]}
            />
          </group>

          {/* Cat outline and details from new GLB */}
          <mesh
            name="Mouth"
            castShadow
            receiveShadow
            geometry={nodes.Mouth.geometry}
            material={materials.BlackOutline}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <group name="NoseEars" rotation={[Math.PI / 2, 0, 0]} />
          <group name="StripesF" rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              name="GroupStripesCurve121"
              castShadow
              receiveShadow
              geometry={nodes.GroupStripesCurve121.geometry}
              material={new THREE.MeshBasicMaterial({ color: 0x000000 })} // Force black color for stripes
            />
            <mesh
              name="GroupStripesCurve121_1"
              castShadow
              receiveShadow
              geometry={nodes.GroupStripesCurve121_1.geometry}
              material={new THREE.MeshBasicMaterial({ color: 0xcc5500 })} // Force darker orange color for stripe base
            />
          </group>
          <group name="CollarF" rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              name="GroupCollarCurve0"
              castShadow
              receiveShadow
              geometry={nodes.GroupCollarCurve0.geometry}
              material={materials["Material.017"]}
            />
            <mesh
              name="GroupCollarCurve0_1"
              castShadow
              receiveShadow
              geometry={nodes.GroupCollarCurve0_1.geometry}
              material={materials["Material.018"]}
            />
          </group>
          <mesh
            name="CupF"
            castShadow
            receiveShadow
            geometry={nodes.CupF.geometry}
            material={materials["Material.019"]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <group name="DeskF" rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              name="GroupDesk_FillCurve0"
              castShadow
              receiveShadow
              geometry={nodes.GroupDesk_FillCurve0.geometry}
              material={materials.BlackOutline}
            />
            <mesh
              name="GroupDesk_FillCurve0_1"
              castShadow
              receiveShadow
              geometry={nodes.GroupDesk_FillCurve0_1.geometry}
              material={materials["Material.015"]}
            />
          </group>
          <group name="DirtF" rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              name="GroupDirt_FillCurve0"
              castShadow
              receiveShadow
              geometry={nodes.GroupDirt_FillCurve0.geometry}
              material={materials["Material.020"]}
            />
            <mesh
              name="GroupDirt_FillCurve0_1"
              castShadow
              receiveShadow
              geometry={nodes.GroupDirt_FillCurve0_1.geometry}
              material={materials["Material.015"]}
            />
          </group>
          <mesh
            name="PotF"
            castShadow
            receiveShadow
            geometry={nodes.PotF.geometry}
            material={materials["Material.054"]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="PillowF"
            castShadow
            receiveShadow
            geometry={nodes.PillowF.geometry}
            material={materials["Material.053"]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <group name="CollarO" rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              name="GroupCollar_OutlineCurve0"
              castShadow
              receiveShadow
              geometry={nodes.GroupCollar_OutlineCurve0.geometry}
              material={materials.BlackOutline}
            />
            <mesh
              name="GroupCollar_OutlineCurve0_1"
              castShadow
              receiveShadow
              geometry={nodes.GroupCollar_OutlineCurve0_1.geometry}
              material={materials["Material.017"]}
            />
          </group>
          <mesh
            name="CupO"
            geometry={nodes.CupO.geometry}
            material={materials.BlackOutline}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="DeskO"
            geometry={nodes.DeskO.geometry}
            material={materials.BlackOutline}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="DirtO"
            geometry={nodes.DirtO.geometry}
            material={materials.BlackOutline}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="PillowO"
            geometry={nodes.PillowO.geometry}
            material={materials.BlackOutline}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="PotO"
            geometry={nodes.PotO.geometry}
            material={materials.BlackOutline}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="Outline"
            geometry={nodes.Outline.geometry}
            material={materials.BlackOutline}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <mesh
            name="LeafO"
            castShadow
            receiveShadow
            geometry={nodes.LeafO.geometry}
            material={materials.BlackOutline}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <group name="LaptopO" rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              name="GroupLaptop_OutlineCurve477"
              castShadow
              receiveShadow
              geometry={nodes.GroupLaptop_OutlineCurve477.geometry}
              material={materials.BlackOutline}
            />
            <mesh
              name="GroupLaptop_OutlineCurve477_1"
              castShadow
              receiveShadow
              geometry={nodes.GroupLaptop_OutlineCurve477_1.geometry}
              material={materials["Material.049"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
});

// Preload the model - Updated to match new GLB
useGLTF.preload("assets/cat_22_lowpoly_modifiers_02.glb");

export default Cat;

// import React, { useRef, useEffect, forwardRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import * as THREE from "three";

// const Cat = forwardRef(({ animationName = "Slow", origin = [0, 0, 0], scale = 1, ...props }, ref) => {
//   const group = useRef(); // local reference for the group
//   const { nodes, materials, animations } = useGLTF("assets/cat_22_lowpoly_modifiers.glb"); // Updated path
//   const { actions } = useAnimations(animations, group);

//   // forward the ref to the parent
//   useEffect(() => {
//     if (ref) {
//       ref.current = group.current; // link the local group ref to the forwarded ref
//     }
//   }, [ref]);

//   // handle animations
//   useEffect(() => {
//     if (actions && animationName) {
//       Object.values(actions).forEach((action) => action.stop());
//       actions[animationName]?.reset().play();
//     }
//   }, [actions, animationName]);

//   // traverse and update materials
//   useEffect(() => {
//     if (group.current) {
//       group.current.traverse((child) => {
//         if (child.isMesh) {
//           if (child.name === "Legsa" || child.name === "Legsb") {
//             child.material.roughness = 1;
//             child.material.metalness = 0;
//             child.material.transparent = false;
//           }

//           if (child.name === "Desk") {
//             child.castShadow = true;
//             child.receiveShadow = true;
//             child.material.transparent = false;
//           }
//         }
//       });
//     }
//   }, []);

//   return (
//     <group {...props} ref={group} dispose={null} scale={scale}>
//       <group position={origin}>
//         <group ref={group}>
//           <group name="Scene">
//             {/* Collar */}
//             <mesh
//               name="Collar"
//               receiveShadow
//               geometry={nodes.Collar.geometry}
//               material={materials.Collar}
//             />
//             <mesh
//               name="Nose"
//               castShadow
//               receiveShadow
//               geometry={nodes.Nose.geometry}
//               material={materials.Nose}
//               position={[0, 2.534, 0.568]}
//             />
//             <mesh
//               name="Tag"
//               castShadow
//               receiveShadow
//               geometry={nodes.Tag.geometry}
//               material={materials.Tag}
//               position={[0, 1.82, -0.005]}
//             />
//             <mesh
//               name="Tag2"
//               castShadow
//               receiveShadow
//               geometry={nodes.Tag2.geometry}
//               material={materials["Material.001"]}
//               position={[0, 1.487, 0.454]}
//             />
            
//             {/* Updated Armature - removed bones that don't exist in new model */}
//             <group name="Armature">
//               <skinnedMesh
//                 name="Body"
//                 geometry={nodes.Body.geometry}
//                 material={materials.Black1}
//                 skeleton={nodes.Body.skeleton}
//                 castShadow
//               />
//               <primitive object={nodes.Base} />
//               <primitive object={nodes.Tail1} />
//               <primitive object={nodes.PR} />
//               <primitive object={nodes.PL} />
//               <primitive object={nodes.TC} />
//               <primitive object={nodes.EyeL} />
//               <primitive object={nodes.EyeR} />
//               <primitive object={nodes.BrowL} />
//               <primitive object={nodes.BrowR} />
//               <primitive object={nodes.neutral_bone} />
//             </group>

//             {/* Updated to Laptop (was Keys) */}
//             <mesh
//               name="Laptop"
//               castShadow
//               receiveShadow
//               geometry={nodes.Laptop.geometry}
//               material={materials["Material.006"]}
//               position={[0, 1.502, 1.064]}
//             />
            
//             <mesh
//               name="Screen"
//               castShadow
//               receiveShadow
//               geometry={nodes.Screen.geometry}
//               material={materials["Material.005"]}
//               position={[0, 2.093, 1.708]}
//             />
//             <mesh
//               name="Chair"
//               castShadow
//               receiveShadow
//               geometry={nodes.Chair.geometry}
//               material={materials["Material.004"]}
//               position={[0, -0.165, -0.782]}
//             />
//             <mesh
//               name="Pot"
//               castShadow
//               receiveShadow
//               geometry={nodes.Pot.geometry}
//               material={materials["Material.012"]}
//               position={[1.937, 0, 1.081]}
//             />
//             <mesh
//               name="Desk"
//               castShadow
//               receiveShadow
//               geometry={nodes.Desk.geometry}
//               material={materials.Material}
//               position={[0, 1.402, 1.039]}
//             />
//             <mesh
//               name="Legsa"
//               castShadow
//               receiveShadow
//               geometry={nodes.Legsa.geometry}
//               material={materials["Material.002"]}
//               position={[0, 0.35, 0.243]}
//             />
//             <mesh
//               name="Legsb"
//               castShadow
//               receiveShadow
//               geometry={nodes.Legsb.geometry}
//               material={materials["Material.003"]}
//               position={[0, 0.35, 0.243]}
//             />
//             <mesh
//               name="Mug"
//               castShadow
//               receiveShadow
//               geometry={nodes.Mug.geometry}
//               material={materials["Material.008"]}
//               position={[-1.153, 1.682, 1.186]}
//             />
//             <mesh
//               name="Mhandle"
//               castShadow
//               receiveShadow
//               geometry={nodes.Mhandle.geometry}
//               material={materials["Material.007"]}
//               position={[-1.276, 1.688, 0.888]}
//             />
//             <mesh
//               name="Soil"
//               castShadow
//               receiveShadow
//               geometry={nodes.Soil.geometry}
//               material={materials["Material.011"]}
//               position={[1.937, 0.643, 1.075]}
//             />
//             <mesh
//               name="Tea"
//               castShadow
//               receiveShadow
//               geometry={nodes.Tea.geometry}
//               material={materials["Material.013"]}
//               position={[-1.153, 1.798, 1.186]}
//             />
//             <mesh
//               name="Leaf"
//               castShadow
//               receiveShadow
//               geometry={nodes.Leaf.geometry}
//               material={materials["Material.009"]}
//               position={[1.934, 1.326, 1.024]}
//               rotation={[-0.573, -0.191, -0.184]}
//             />
//             <mesh
//               name="Screen001"
//               castShadow
//               receiveShadow
//               geometry={nodes.Screen001.geometry}
//               material={materials["Material.014"]}
//               position={[0, 2.088, 1.658]}
//             />
//             <mesh
//               name="Leaf001"
//               castShadow
//               receiveShadow
//               geometry={nodes.Leaf001.geometry}
//               material={materials["Material.009"]}
//               position={[1.85, 1.742, 1.135]}
//               rotation={[-2.553, 0.436, 2.783]}
//             />
//             <mesh
//               name="Leaf002"
//               castShadow
//               receiveShadow
//               geometry={nodes.Leaf002.geometry}
//               material={materials["Material.009"]}
//               position={[2.036, 1.314, 1.23]}
//               rotation={[-2.212, -0.732, -2.228]}
//             />

//             {/* New grouped Keys structure (replaces individual K1, K2, etc.) */}
//             <group name="Keys" position={[0.665, 1.551, 1.275]}>
//               <mesh
//                 name="Cube032"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032.geometry}
//                 material={materials["Material.023"]}
//               />
//               <mesh
//                 name="Cube032_1"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_1.geometry}
//                 material={materials["Material.024"]}
//               />
//               <mesh
//                 name="Cube032_2"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_2.geometry}
//                 material={materials["Material.025"]}
//               />
//               <mesh
//                 name="Cube032_3"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_3.geometry}
//                 material={materials["Material.026"]}
//               />
//               <mesh
//                 name="Cube032_4"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_4.geometry}
//                 material={materials["Material.027"]}
//               />
//               <mesh
//                 name="Cube032_5"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_5.geometry}
//                 material={materials["Material.028"]}
//               />
//               <mesh
//                 name="Cube032_6"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_6.geometry}
//                 material={materials["Material.029"]}
//               />
//               <mesh
//                 name="Cube032_7"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_7.geometry}
//                 material={materials["Material.030"]}
//               />
//               <mesh
//                 name="Cube032_8"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_8.geometry}
//                 material={materials["Material.031"]}
//               />
//               <mesh
//                 name="Cube032_9"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_9.geometry}
//                 material={materials["Material.032"]}
//               />
//               <mesh
//                 name="Cube032_10"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_10.geometry}
//                 material={materials["Material.033"]}
//               />
//               <mesh
//                 name="Cube032_11"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_11.geometry}
//                 material={materials["Material.034"]}
//               />
//               <mesh
//                 name="Cube032_12"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_12.geometry}
//                 material={materials["Material.035"]}
//               />
//               <mesh
//                 name="Cube032_13"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_13.geometry}
//                 material={materials["Material.036"]}
//               />
//               <mesh
//                 name="Cube032_14"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_14.geometry}
//                 material={materials["Material.037"]}
//               />
//               <mesh
//                 name="Cube032_15"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_15.geometry}
//                 material={materials["Material.038"]}
//               />
//               <mesh
//                 name="Cube032_16"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_16.geometry}
//                 material={materials["Material.039"]}
//               />
//               <mesh
//                 name="Cube032_17"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_17.geometry}
//                 material={materials["Material.040"]}
//               />
//               <mesh
//                 name="Cube032_18"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_18.geometry}
//                 material={materials["Material.041"]}
//               />
//               <mesh
//                 name="Cube032_19"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_19.geometry}
//                 material={materials["Material.042"]}
//               />
//               <mesh
//                 name="Cube032_20"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_20.geometry}
//                 material={materials["Material.043"]}
//               />
//               <mesh
//                 name="Cube032_21"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_21.geometry}
//                 material={materials["Material.044"]}
//               />
//               <mesh
//                 name="Cube032_22"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_22.geometry}
//                 material={materials["Material.045"]}
//               />
//               <mesh
//                 name="Cube032_23"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Cube032_23.geometry}
//                 material={materials["Material.046"]}
//               />
//             </group>

//             {/* Updated Cat stripes and outline meshes! */}
//             <mesh
//               name="Mouth"
//               receiveShadow
//               geometry={nodes.Mouth.geometry}
//               material={materials["Material.016"]}
//               rotation={[Math.PI / 2, 0, 0]}
//             />
            
//             <group name="StripesF" rotation={[Math.PI / 2, 0, 0]}>
//               <mesh
//                 name="GroupStripesCurve121"
//                 receiveShadow
//                 geometry={nodes.GroupStripesCurve121.geometry}
//                 material={materials["Material.016"]}
//               />
//               <mesh
//                 name="GroupStripesCurve121_1"
//                 receiveShadow
//                 geometry={nodes.GroupStripesCurve121_1.geometry}
//                 material={materials["Material.055"]}
//               />
//             </group>
            
//             <group name="CollarO" rotation={[Math.PI / 2, 0, 0]}>
//               <mesh
//                 name="GroupCollar_OutlineCurve0"
//                 receiveShadow
//                 geometry={nodes.GroupCollar_OutlineCurve0.geometry}
//                 material={materials["Material.016"]}
//               />
//               <mesh
//                 name="GroupCollar_OutlineCurve0_1"
//                 receiveShadow
//                 geometry={nodes.GroupCollar_OutlineCurve0_1.geometry}
//                 material={materials["Material.017"]}
//               />
//             </group>
            
//             <mesh
//               name="CupO"
//               castShadow
//               geometry={nodes.CupO.geometry}
//               material={materials["Material.016"]}
//               rotation={[Math.PI / 2, 0, 0]}
//             />
            
//             <mesh
//               name="DeskO"
//               castShadow
//               receiveShadow
//               geometry={nodes.DeskO.geometry}
//               material={materials["Material.016"]}
//               rotation={[Math.PI / 2, 0, 0]}
//             />
            
//             <mesh
//               name="DirtO"
//               castShadow
//               receiveShadow
//               geometry={nodes.DirtO.geometry}
//               material={materials["Material.016"]}
//               rotation={[Math.PI / 2, 0, 0]}
//             />
            
//             <mesh
//               name="PillowO"
//               castShadow
//               receiveShadow
//               geometry={nodes.PillowO.geometry}
//               material={materials["Material.016"]}
//               rotation={[Math.PI / 2, 0, 0]}
//             />
            
//             <mesh
//               name="PotO"
//               castShadow
//               receiveShadow
//               geometry={nodes.PotO.geometry}
//               material={materials["Material.016"]}
//               rotation={[Math.PI / 2, 0, 0]}
//             />
            
//             <mesh
//               name="Outline"
//               receiveShadow
//               geometry={nodes.Outline.geometry}
//               material={materials["Material.016"]}
//               rotation={[Math.PI / 2, 0, 0]}
//             />
            
//             <mesh
//               name="LeafO"
//               receiveShadow
//               geometry={nodes.LeafO.geometry}
//               material={materials["Material.016"]}
//               rotation={[Math.PI / 2, 0, 0]}
//             />
            
//             <group name="LaptopO" rotation={[Math.PI / 2, 0, 0]}>
//               <mesh
//                 name="GroupLaptop_OutlineCurve477"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.GroupLaptop_OutlineCurve477.geometry}
//                 material={materials["Material.016"]}
//               />
//               <mesh
//                 name="GroupLaptop_OutlineCurve477_1"
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.GroupLaptop_OutlineCurve477_1.geometry}
//                 material={materials["Material.049"]}
//               />
//             </group>
//           </group>
//         </group>
//       </group>
//     </group>
//   );
// });

// // Preload the model - Updated path
// useGLTF.preload("assets/cat_22_lowpoly_modifiers.glb");

// export default Cat;



