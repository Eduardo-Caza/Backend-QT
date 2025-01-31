import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";

// Definir el esquema para el Moderador
const moderadorSchema = new Schema({
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true, // Asegura que el correo electrónico sea único en la base de datos
      match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un correo electrónico válido"]
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"]
    },
    estado: {
      type: Boolean,
      default: true, // Estado de activación del moderador
    },
    pais: {
      type: String, // Nuevo campo para el país
      required: true
    },
    telefono: {
      type: String, // Nuevo campo para el teléfono
      required: true
    },
    direccion: {
      type: String, // Nuevo campo para la dirección
      required: true
    },
    usuario: {
      type: String, // Nuevo campo para el apodo
      unique: true,
      required: true
    }
  },
  {
    timestamps: true, // Usa timestamps para createdAt y updatedAt
  }
);

// // Encriptar la contraseña antes de guardarla
// moderadorSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next(); // Solo encripta si la contraseña ha sido modificada
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error); // Si hay un error durante la encriptación, pasa el error al siguiente middleware
//   }
// });

// Método para encriptar la contraseña
moderadorSchema.methods.encrypPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const passwordEncryp = await bcrypt.hash(password,salt)
  return passwordEncryp
};

// Método para comparar la contraseña ingresada con la almacenada
moderadorSchema.methods.matchPassword = async function(password) {
  const response = await bcrypt.compare(password,this.password)
  return response
};

// Crear y exportar el modelo
// const Moderador = mongoose.model("Moderador", moderadorSchema); esto le quite porque estaba de forma incorrecta le hice yo mismo que orgullo xd

export default model('Moderador',moderadorSchema);