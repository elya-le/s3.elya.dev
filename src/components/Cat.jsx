

import React, { useRef, useEffect, forwardRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const Cat = forwardRef(({ animationName = "Slow", origin = [0, 0, 0], scale = 1, ...props }, ref) => {
  const group = useRef(); // local reference for the group
  const { nodes, materials, animations } = useGLTF("assets/cat_22_lowpoly_modifiers.glb"); // Updated path
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

  // traverse and update materials
  useEffect(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Legsa" || child.name === "Legsb") {
            child.material.roughness = 1;
            child.material.metalness = 0;
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
  }, []);

  return (
    <group {...props} ref={group} dispose={null} scale={scale}>
      <group position={origin}>
        <group ref={group}>
          <group name="Scene">
            {/* Collar */}
            <mesh
              name="Collar"
              receiveShadow
              geometry={nodes.Collar.geometry}
              material={materials.Collar}
            />
            <mesh
              name="Nose"
              castShadow
              receiveShadow
              geometry={nodes.Nose.geometry}
              material={materials.Nose}
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
            
            {/* Updated Armature - removed bones that don't exist in new model */}
            <group name="Armature">
              <skinnedMesh
                name="Body"
                geometry={nodes.Body.geometry}
                material={materials.Black1}
                skeleton={nodes.Body.skeleton}
                castShadow
              />
              <primitive object={nodes.Base} />
              <primitive object={nodes.Tail1} />
              <primitive object={nodes.PR} />
              <primitive object={nodes.PL} />
              <primitive object={nodes.TC} />
              <primitive object={nodes.EyeL} />
              <primitive object={nodes.EyeR} />
              <primitive object={nodes.BrowL} />
              <primitive object={nodes.BrowR} />
              <primitive object={nodes.neutral_bone} />
            </group>

            {/* Updated to Laptop (was Keys) */}
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
              material={materials["Material.012"]}
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
              material={materials["Material.011"]}
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

            {/* New grouped Keys structure (replaces individual K1, K2, etc.) */}
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

            {/* Updated Cat stripes and outline meshes! */}
            <mesh
              name="Mouth"
              receiveShadow
              geometry={nodes.Mouth.geometry}
              material={materials["Material.016"]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            <group name="StripesF" rotation={[Math.PI / 2, 0, 0]}>
              <mesh
                name="GroupStripesCurve121"
                receiveShadow
                geometry={nodes.GroupStripesCurve121.geometry}
                material={materials["Material.016"]}
              />
              <mesh
                name="GroupStripesCurve121_1"
                receiveShadow
                geometry={nodes.GroupStripesCurve121_1.geometry}
                material={materials["Material.055"]}
              />
            </group>
            
            <group name="CollarO" rotation={[Math.PI / 2, 0, 0]}>
              <mesh
                name="GroupCollar_OutlineCurve0"
                receiveShadow
                geometry={nodes.GroupCollar_OutlineCurve0.geometry}
                material={materials["Material.016"]}
              />
              <mesh
                name="GroupCollar_OutlineCurve0_1"
                receiveShadow
                geometry={nodes.GroupCollar_OutlineCurve0_1.geometry}
                material={materials["Material.017"]}
              />
            </group>
            
            <mesh
              name="CupO"
              castShadow
              receiveShadow
              geometry={nodes.CupO.geometry}
              material={materials["Material.016"]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            <mesh
              name="DeskO"
              castShadow
              receiveShadow
              geometry={nodes.DeskO.geometry}
              material={materials["Material.016"]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            <mesh
              name="DirtO"
              castShadow
              receiveShadow
              geometry={nodes.DirtO.geometry}
              material={materials["Material.016"]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            <mesh
              name="PillowO"
              castShadow
              receiveShadow
              geometry={nodes.PillowO.geometry}
              material={materials["Material.016"]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            <mesh
              name="PotO"
              castShadow
              receiveShadow
              geometry={nodes.PotO.geometry}
              material={materials["Material.016"]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            <mesh
              name="Outline"
              receiveShadow
              geometry={nodes.Outline.geometry}
              material={materials["Material.016"]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            <mesh
              name="LeafO"
              receiveShadow
              geometry={nodes.LeafO.geometry}
              material={materials["Material.016"]}
              rotation={[Math.PI / 2, 0, 0]}
            />
            
            <group name="LaptopO" rotation={[Math.PI / 2, 0, 0]}>
              <mesh
                name="GroupLaptop_OutlineCurve477"
                castShadow
                receiveShadow
                geometry={nodes.GroupLaptop_OutlineCurve477.geometry}
                material={materials["Material.016"]}
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
    </group>
  );
});

// Preload the model - Updated path
useGLTF.preload("assets/cat_22_lowpoly_modifiers.glb");

export default Cat;




// import React, { useRef, useEffect, forwardRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import * as THREE from "three";

// const Cat = forwardRef(({ animationName = "Slow", origin = [0, 0, 0], scale = 1, ...props }, ref) => {
//   const group = useRef(); // local reference for the group
//   const { nodes, materials, animations } = useGLTF("/assets/cat_15.glb");
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
//               castShadow
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
//             <group name="Armature">
//               <skinnedMesh
//                 name="Body"
//                 geometry={nodes.Body.geometry}
//                 material={materials.Black1}
//                 skeleton={nodes.Body.skeleton}
//               />
//               <primitive object={nodes.Base} />
//               <primitive object={nodes.Tail1} />
//               <primitive object={nodes.PR} />
//               <primitive object={nodes.RcontR} />
//               <primitive object={nodes.PL} />
//               <primitive object={nodes.LcontL} />
//               <primitive object={nodes.TC} />
//               <primitive object={nodes.EyeL} />
//               <primitive object={nodes.EyeR} />
//               <primitive object={nodes.EyeCon} />
//               <primitive object={nodes.BrowL} />
//               <primitive object={nodes.BrowR} />
//               <primitive object={nodes.neutral_bone} />
//             </group>
//             <mesh
//               name="Keys"
//               castShadow
//               receiveShadow
//               geometry={nodes.Keys.geometry}
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
//             <mesh
//               name="Screen001"
//               castShadow
//               receiveShadow
//               geometry={nodes.Screen001.geometry}
//               material={materials["Material.014"]}
//               position={[0, 2.088, 1.658]}
//             />
//                       <mesh
//               name="K1"
//               castShadow
//               receiveShadow
//               geometry={nodes.K1.geometry}
//               material={materials['Material.023']}
//               position={[0.665, 1.551, 1.275]}
//             />
//             <mesh
//               name="K1001"
//               castShadow
//               receiveShadow
//               geometry={nodes.K1001.geometry}
//               material={materials['Material.024']}
//               position={[0.476, 1.551, 1.275]}
//             />
//             <mesh
//               name="K1002"
//               castShadow
//               receiveShadow
//               geometry={nodes.K1002.geometry}
//               material={materials['Material.025']}
//               position={[0.285, 1.551, 1.275]}
//             />
//             <mesh
//               name="K1003"
//               castShadow
//               receiveShadow
//               geometry={nodes.K1003.geometry}
//               material={materials['Material.026']}
//               position={[0.095, 1.551, 1.275]}
//             />
//             <mesh
//               name="K1004"
//               castShadow
//               receiveShadow
//               geometry={nodes.K1004.geometry}
//               material={materials['Material.027']}
//               position={[-0.095, 1.551, 1.275]}
//             />
//             <mesh
//               name="K1005"
//               castShadow
//               receiveShadow
//               geometry={nodes.K1005.geometry}
//               material={materials['Material.028']}
//               position={[-0.285, 1.551, 1.275]}
//             />
//             <mesh
//               name="K1006"
//               castShadow
//               receiveShadow
//               geometry={nodes.K1006.geometry}
//               material={materials['Material.029']}
//               position={[-0.476, 1.551, 1.275]}
//             />
//             <mesh
//               name="K1007"
//               castShadow
//               receiveShadow
//               geometry={nodes.K1007.geometry}
//               material={materials['Material.030']}
//               position={[-0.665, 1.551, 1.275]}
//             />
//             <mesh
//               name="K2"
//               castShadow
//               receiveShadow
//               geometry={nodes.K2.geometry}
//               material={materials['Material.031']}
//               position={[0.571, 1.551, 1.065]}
//             />
//             <mesh
//               name="K2001"
//               castShadow
//               receiveShadow
//               geometry={nodes.K2001.geometry}
//               material={materials['Material.032']}
//               position={[0.38, 1.551, 1.065]}
//             />
//             <mesh
//               name="K2002"
//               castShadow
//               receiveShadow
//               geometry={nodes.K2002.geometry}
//               material={materials['Material.033']}
//               position={[0.19, 1.551, 1.065]}
//             />
//             <mesh
//               name="K2003"
//               castShadow
//               receiveShadow
//               geometry={nodes.K2003.geometry}
//               material={materials['Material.034']}
//               position={[0, 1.551, 1.065]}
//             />
//             <mesh
//               name="K2004"
//               castShadow
//               receiveShadow
//               geometry={nodes.K2004.geometry}
//               material={materials['Material.035']}
//               position={[-0.19, 1.551, 1.065]}
//             />
//             <mesh
//               name="K2005"
//               castShadow
//               receiveShadow
//               geometry={nodes.K2005.geometry}
//               material={materials['Material.036']}
//               position={[-0.38, 1.551, 1.065]}
//             />
//             <mesh
//               name="K2006"
//               castShadow
//               receiveShadow
//               geometry={nodes.K2006.geometry}
//               material={materials['Material.037']}
//               position={[-0.57, 1.551, 1.065]}
//             />
//             <mesh
//               name="K3"
//               castShadow
//               receiveShadow
//               geometry={nodes.K3.geometry}
//               material={materials['Material.038']}
//               position={[0.515, 1.551, 0.855]}
//             />
//             <mesh
//               name="K3001"
//               castShadow
//               receiveShadow
//               geometry={nodes.K3001.geometry}
//               material={materials['Material.039']}
//               position={[0.285, 1.551, 0.855]}
//             />
//             <mesh
//               name="K3002"
//               castShadow
//               receiveShadow
//               geometry={nodes.K3002.geometry}
//               material={materials['Material.040']}
//               position={[0.095, 1.551, 0.855]}
//             />
//             <mesh
//               name="K3003"
//               castShadow
//               receiveShadow
//               geometry={nodes.K3003.geometry}
//               material={materials['Material.041']}
//               position={[-0.095, 1.551, 0.855]}
//             />
//             <mesh
//               name="K3004"
//               castShadow
//               receiveShadow
//               geometry={nodes.K3004.geometry}
//               material={materials['Material.042']}
//               position={[-0.285, 1.551, 0.855]}
//             />
//             <mesh
//               name="K3005"
//               castShadow
//               receiveShadow
//               geometry={nodes.K3005.geometry}
//               material={materials['Material.043']}
//               position={[-0.585, 1.551, 0.855]}
//             />
//             <mesh
//               name="K4"
//               castShadow
//               receiveShadow
//               geometry={nodes.K4.geometry}
//               material={materials['Material.044']}
//               position={[0.626, 1.551, 0.644]}
//             />
//             <mesh
//               name="K4001"
//               castShadow
//               receiveShadow
//               geometry={nodes.K4001.geometry}
//               material={materials['Material.045']}
//               position={[0, 1.551, 0.645]}
//             />
//             <mesh
//               name="K4002"
//               castShadow
//               receiveShadow
//               geometry={nodes.K4002.geometry}
//               material={materials['Material.046']}
//               position={[-0.621, 1.551, 0.643]}
//             />
//           </group>
//         </group>
//       </group>
//     </group>
//   );
// });

// // Preload the model
// useGLTF.preload("/assets/cat_15.glb");

// export default Cat;