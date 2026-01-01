import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
    // Re-export common react-three-fiber intrinsic elements with permissive props
    // This provides enough typing for TS to accept R3F JSX in this project without
    // relying on experimental automatic global augmentation.
    interface IntrinsicElements {
      group: Partial<ReactThreeFiber.Object3DNode<any, any>> & { [key: string]: any };
      mesh: Partial<ReactThreeFiber.Object3DNode<any, any>> & { [key: string]: any };
      sphereGeometry: any;
      boxGeometry: any;
      cylinderGeometry: any;
      meshStandardMaterial: any;
      color: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

export {};
