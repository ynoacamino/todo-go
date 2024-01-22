export default function formatearFecha(timestamp: number): string {
  const fecha = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };

  const formatoFecha = new Intl.DateTimeFormat('es-ES', options);

  const fechaFormateada: string = formatoFecha.format(fecha);

  return fechaFormateada;
}
