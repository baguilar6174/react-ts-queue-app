export type Item<TData, TResult> = {
  data: TData;
  callback: (result: TResult) => void;
};
type Done<TResult> = (result: TResult) => void;
type Worker<TData, TResult> = (
  data: TData,
  done: (result: TResult) => void
) => void;

/**
 * Estructura de datos Cola
 * @param worker Es la función que debo ejecutar para cada uno de los elementos en la cola
 */
export default function Queue<TData, TResult>(worker: Worker<TData, TResult>) {
  let queueItems: Item<TData, TResult>[] = []; // Elements in the queue
  let isWorking: boolean = false; // Checks whether tasks that need to be performed are being done.

  function runNext() {
    if (isWorking) return; // Si esta trabajando, no podemos ejecutar el siguiente elemento
    if (queueItems.length === 0) return; // Si la cola está vacía no hay nada que ejecutar

    // Extraer el elemento de la cola que va a ser ejecutado
    const item = queueItems.shift(); // Extrae el primer elemento y modifica el array eliminando dicho elemento
    if (!item) return; // Verificar si tenemos un item para ejecutar

    isWorking = true; // Indicamos que nuestra tiene algo en proceso
    worker(item.data, function done(result: TResult) {
      // El worker deberá ejecutar la función done() cuando haya terminado el proceso
      isWorking = false;
      runNext();
      setTimeout(function () {
        item.callback(result);
      }, 0);
    });
  }

  /**
   * @param data Información que queremos pasarle a la cola (elemento que quiero procesar)
   * @param callback Función que se ejecutará cuando el elemento sea ejecutado
   */
  return function (data: TData, callback: (result: TResult) => void) {
    queueItems.push({
      data,
      callback,
    });
    setTimeout(runNext, 0); // Ejecutar cuando eventLoop quede libre la función runNext()
  };
}
