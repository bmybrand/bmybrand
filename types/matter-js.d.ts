declare module "matter-js" {
  namespace Matter {
    interface IBodyDefinition {
      [key: string]: unknown;
    }

    interface Body {
      position: {
        x: number;
        y: number;
      };
      angle: number;
    }

    interface Engine {
      world: unknown;
      gravity?: unknown;
    }

    interface Runner {}

    interface MouseConstraint {}

    const Engine: {
      create(options?: unknown): Engine;
      clear(engine: Engine): void;
    };

    const Runner: {
      create(options?: unknown): Runner;
      run(runner: Runner, engine: Engine): void;
      stop(runner: Runner): void;
    };

    const World: {
      add(world: unknown, body: unknown): void;
      remove(world: unknown, body: unknown): void;
    };

    const Bodies: {
      rectangle(...args: unknown[]): Body;
    };

    const Body: {
      setAngle(body: Body, angle: number): void;
    };

    const Mouse: {
      create(element: HTMLElement): unknown;
    };

    const MouseConstraint: {
      create(engine: Engine, options: unknown): MouseConstraint;
    };
  }

  export default Matter;
}
