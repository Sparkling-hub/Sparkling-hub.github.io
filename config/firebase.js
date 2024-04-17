import { initializeApp, getApps } from "firebase-admin/app"; 
import admin from "firebase-admin";

const serviceAccount  = {
  "type": process.env.SERVICE_TYPE,
  "project_id": process.env.SERVICE_PROJECT_ID,
  "private_key_id": process.env.SERVICE_PRIVATE_KEY_ID,
  "private_key": process.env.SERVICE_PRIVATE_KEY,
  "client_email": process.env.SERVICE_CLIENT_EMAIL,
  "client_id": process.env.SERVICE_CLIENT_ID,
  "auth_uri": process.env.SERVICE_AUTH_URI,
  "token_uri": process.env.STVICE_TOKEN_URI,
  "auth_provider_x509_cert_url":  process.env.SERVICE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url":  process.env.SERVICE_CLIENT_X509_CERT_URL,
  "universe_domain":  process.env.SERVICE_UNIVERSE_DOMAIN,
}
const firebaseConfig = {
  "credential": admin.credential.cert(serviceAccount),
  "apiKey": process.env.DATABASE_API_KEY,
  "authDomain":process.env.DATABASE_AUTH_DOMAIN ,
  "projectId": process.env.DATABASE_PROJECT_ID,
  "storageBucket": process.env.DATABASE_STORAGE_BUCKET,
  "messagingSenderId":  process.env.DATABASE_MESSAGING_SENDER_ID,
  "appId": process.env.DATABASE_APP_ID,
  "measurementId":  process.env.DATABASE_MEASUREMENT_ID
}
  



export function firebaseGetApp(){
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

};