import User from "../Entities/Users/Modelo.js";

const clearSeedData = async () => {
    try {
      await User.deleteMany({ isSeeded: true });
      console.log('Datos sembrados eliminados correctamente.');
    } catch (error) {
      console.error('Error al limpiar datos sembrados:', error);
    }
  };

  export default clearSeedData