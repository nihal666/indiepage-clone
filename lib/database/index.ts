import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function connectDatabase() {
  if (connection.isConnected) {
    return;
  }

  const database = await mongoose.connect(process.env.MONGODB_URI!);

  connection.isConnected = database.connections[0].readyState;
}

export default connectDatabase;
