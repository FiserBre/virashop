import { ReactThreeFiber } from '@react-three/fiber';

declare global {
  namespace JSX {
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

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
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
