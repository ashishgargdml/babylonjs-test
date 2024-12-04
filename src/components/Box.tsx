import {
  ArcRotateCamera,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import CreateScene from './SceneComponent';

// type Props = {}

function Box() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let box: Mesh;
  const onSceneReady = (canvas: HTMLCanvasElement, scene: Scene) => {
    const camera = new ArcRotateCamera(
      'camera1',
      -Math.PI / 2,
      Math.PI / 3.5,
      25,
      new Vector3(0, 0, 0)
    );

    camera.attachControl(canvas, false);
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 10;

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    box = MeshBuilder.CreateBox('myBpx', { size: 2 }, scene);
    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 4, height: 4, subdivisions: 50 },
      scene
    );

    ground.material = new StandardMaterial('material', scene);
    ground.material.wireframe = true;
  };

  // @ts-expect-error scence not used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onRender = (scene: Scene) => {
    // if (box !== undefined) {
    //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    //   const rpm = 10;
    //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    // }
  };

  return (
    <div>
      <CreateScene onSceneReady={onSceneReady} onRender={onRender} />
    </div>
  );
}

export default Box;
