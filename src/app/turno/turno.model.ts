export interface Turno {
    id: string;
    idTurno: number;
    fecha: string; // Se puede usar 'YYYY-MM-DD'
    horaInicioAgendamiento: string; // Ej. '07:00'
    horaFinAgendamiento: string; // Ej. '17:00'
    idProveedor: string;
    idJaula: string;
    horaInicioRecepcion: string; // Ej. '08:00'
    horaFinRecepcion: string; // Ej. '18:00'
  }
  
  export interface TurnoDetalle {
    id: string;
    idTurno: number;
    idProducto: number;
    cantidad: number;
  }
  