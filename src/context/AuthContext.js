import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase'
import { getAuth } from 'firebase/auth'
const app = initializeApp(process.env.FIREBASE_CONFIG);
export const auth = getAuth(app);


