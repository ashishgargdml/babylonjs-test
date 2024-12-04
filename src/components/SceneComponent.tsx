import React, { useRef } from 'react';
import { Engine, Scene } from '@babylonjs/core';

export default function CreateScene({
  onSceneReady,
  onRender,
}: {
  onSceneReady: (canvas: HTMLCanvasElement, scene: Scene) => void;
  onRender: (scene: Scene) => void;
}) {
  const canvasRef = useRef(null);

  React.useEffect(() => {
    const { current: canvas } = canvasRef;
    if (!canvas) return;
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    if (scene.isReady()) {
      onSceneReady(canvas, scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(canvas, scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', resize);
    }

    return () => {
      scene.getEngine().dispose();
      if (window) {
        window.removeEventListener('resize', resize);
      }
    };
  }, [canvasRef, onSceneReady, onRender]);

  return (
    <canvas
      ref={canvasRef}
      id="renderCanvas"
      onMouseDown={() => console.log('down')}
    />
  );
}
