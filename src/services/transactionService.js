import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function saveTransaction(data) {
  await addDoc(collection(db, "transactions"), {
    agent: data.agent,   // MUST be string
    allocatedStock: data.allocatedStock,
    returnedStock: data.returnedStock,
    cashPaid: data.cashPaid,
    mpesaPaid: data.mpesaPaid,
    debt: data.debt,
    createdAt: new Date()
  });
}

export async function getTransactions() {
  const snapshot = await getDocs(
    collection(db, "transactions")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}