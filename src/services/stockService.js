import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const STOCK_DOC = "currentStock";

export async function saveStockNeededToday(stockData) {
  await setDoc(doc(db, "stockNeededToday", STOCK_DOC), {
    stockNeededToday: stockData,
    createdAt: new Date()
  });
}

export async function getStockNeededToday() {
  const snap = await getDoc(doc(db, "stockNeededToday", STOCK_DOC));

  if (snap.exists()) {
    return snap.data().stockNeededToday;
  }

  return {};
}