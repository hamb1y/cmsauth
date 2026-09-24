declare global {
  namespace App {
    interface Locals { session?: import('$lib/server/auth').SessionContext; site?: import('$lib/server/types').Site; }
  }
}
export {};
